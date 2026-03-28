-- Create enum for product market availability
CREATE TYPE "Market" AS ENUM ('RD', 'US');

-- Extend Product model for markets and localized content
ALTER TABLE "Product"
ADD COLUMN "title_es" TEXT,
ADD COLUMN "title_en" TEXT,
ADD COLUMN "description_es" TEXT,
ADD COLUMN "description_en" TEXT,
ADD COLUMN "availableMarkets" "Market"[] NOT NULL DEFAULT ARRAY['RD', 'US']::"Market"[];

-- Backfill existing rows explicitly to preserve compatibility
UPDATE "Product"
SET "availableMarkets" = ARRAY['RD', 'US']::"Market"[]
WHERE "availableMarkets" IS NULL OR cardinality("availableMarkets") = 0;
