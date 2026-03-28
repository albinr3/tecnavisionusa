Param(
    [string]$SourceDbUrl,

    [string]$TargetDbUrl,

    [string]$DumpFile = ".\\tmp\\db-transfer.sql",

    [switch]$CleanTarget
)

$ErrorActionPreference = "Stop"

function Import-DotEnv {
    param([string]$Path = ".env")

    if (-not (Test-Path $Path)) {
        return
    }

    $lines = Get-Content -Path $Path
    foreach ($line in $lines) {
        $trimmed = $line.Trim()
        if ([string]::IsNullOrWhiteSpace($trimmed) -or $trimmed.StartsWith("#")) {
            continue
        }

        $idx = $trimmed.IndexOf("=")
        if ($idx -lt 1) {
            continue
        }

        $key = $trimmed.Substring(0, $idx).Trim()
        $value = $trimmed.Substring($idx + 1).Trim()

        if (
            ($value.StartsWith('"') -and $value.EndsWith('"')) -or
            ($value.StartsWith("'") -and $value.EndsWith("'"))
        ) {
            $value = $value.Substring(1, $value.Length - 2)
        }

        [Environment]::SetEnvironmentVariable($key, $value, "Process")
    }
}

function Require-Command {
    param([Parameter(Mandatory = $true)][string]$Name)
    if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
        throw "Command '$Name' was not found in PATH."
    }
}

function Normalize-DbUrl {
    param([Parameter(Mandatory = $true)][string]$Url)

    # pg_dump/psql reject Prisma-specific query params like ?schema=public
    # Keep only sslmode/application_name commonly used by libpq.
    try {
        $uri = [System.Uri]$Url
    } catch {
        return $Url
    }

    $allowed = @{}
    if (-not [string]::IsNullOrWhiteSpace($uri.Query)) {
        $pairs = $uri.Query.TrimStart("?").Split("&", [System.StringSplitOptions]::RemoveEmptyEntries)
        foreach ($pair in $pairs) {
            $kv = $pair.Split("=", 2)
            $k = [System.Uri]::UnescapeDataString($kv[0])
            $v = if ($kv.Length -gt 1) { [System.Uri]::UnescapeDataString($kv[1]) } else { "" }
            if ($k -in @("sslmode", "application_name", "connect_timeout", "options")) {
                $allowed[$k] = $v
            }
        }
    }

    $builder = [System.UriBuilder]$uri
    if ($allowed.Count -eq 0) {
        $builder.Query = ""
    } else {
        $builder.Query = ($allowed.GetEnumerator() | ForEach-Object {
            "$([System.Uri]::EscapeDataString($_.Key))=$([System.Uri]::EscapeDataString($_.Value))"
        }) -join "&"
    }
    return $builder.Uri.AbsoluteUri
}

function Assert-LastExitCode {
    param([Parameter(Mandatory = $true)][string]$Step)
    if ($LASTEXITCODE -ne 0) {
        throw "$Step failed with exit code $LASTEXITCODE."
    }
}

function Sanitize-DumpFile {
    param([Parameter(Mandatory = $true)][string]$Path)

    $raw = Get-Content -Path $Path -Raw
    $raw = [regex]::Replace(
        $raw,
        "(?ms)^CREATE SCHEMA public;\s*",
        ""
    )
    $raw = [regex]::Replace(
        $raw,
        "(?ms)^COMMENT ON SCHEMA public IS 'standard public schema';\s*",
        ""
    )
    Set-Content -Path $Path -Value $raw -NoNewline
}

Import-DotEnv

if ([string]::IsNullOrWhiteSpace($SourceDbUrl)) {
    $SourceDbUrl = $env:SOURCE_DATABASE_URL
}

if ([string]::IsNullOrWhiteSpace($TargetDbUrl)) {
    $TargetDbUrl = $env:DATABASE_URL
}

if ([string]::IsNullOrWhiteSpace($SourceDbUrl)) {
    throw "Missing source DB URL. Provide -SourceDbUrl or set SOURCE_DATABASE_URL in .env."
}

if ([string]::IsNullOrWhiteSpace($TargetDbUrl)) {
    throw "Missing target DB URL. Provide -TargetDbUrl or set DATABASE_URL in .env."
}

$SourceDbUrl = Normalize-DbUrl -Url $SourceDbUrl
$TargetDbUrl = Normalize-DbUrl -Url $TargetDbUrl

Require-Command -Name "pg_dump"
Require-Command -Name "psql"

$dumpDir = Split-Path -Parent $DumpFile
if (-not [string]::IsNullOrWhiteSpace($dumpDir) -and -not (Test-Path $dumpDir)) {
    New-Item -Path $dumpDir -ItemType Directory | Out-Null
}

Write-Host "1/3 Exporting source database..."
pg_dump `
    --dbname="$SourceDbUrl" `
    --schema=public `
    --no-owner `
    --no-privileges `
    --encoding=UTF8 `
    --format=plain `
    --file="$DumpFile"
Assert-LastExitCode -Step "pg_dump export"
Sanitize-DumpFile -Path $DumpFile

if ($CleanTarget) {
    Write-Host "2/3 Cleaning target public tables..."
    $truncateSql = @'
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public'
  LOOP
    EXECUTE 'TRUNCATE TABLE public.' || quote_ident(r.tablename) || ' RESTART IDENTITY CASCADE';
  END LOOP;
END $$;
'@

    $truncateSql | psql --dbname="$TargetDbUrl" --set=ON_ERROR_STOP=1
    Assert-LastExitCode -Step "target cleanup"
} else {
    Write-Host "2/3 Skipping target cleanup (CleanTarget disabled)..."
}

Write-Host "3/3 Importing into target database..."
psql `
    --dbname="$TargetDbUrl" `
    --set=ON_ERROR_STOP=1 `
    --file="$DumpFile"
Assert-LastExitCode -Step "target import"

Write-Host "Done. Database migration completed."
