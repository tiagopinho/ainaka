ALTER TABLE "projects"
ADD COLUMN IF NOT EXISTS "gallery_urls" jsonb DEFAULT '[]'::jsonb NOT NULL;

