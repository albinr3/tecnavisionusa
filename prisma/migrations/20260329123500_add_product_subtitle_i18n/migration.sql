-- Add localized subtitle fields for market-specific product subtitles
ALTER TABLE "Product"
ADD COLUMN "subtitle_es" TEXT,
ADD COLUMN "subtitle_en" TEXT;

-- Backfill existing subtitle into both localized fields when empty
UPDATE "Product"
SET "subtitle_es" = "subtitle"
WHERE "subtitle" IS NOT NULL
  AND "subtitle_es" IS NULL;

UPDATE "Product"
SET "subtitle_en" = "subtitle"
WHERE "subtitle" IS NOT NULL
  AND "subtitle_en" IS NULL;
