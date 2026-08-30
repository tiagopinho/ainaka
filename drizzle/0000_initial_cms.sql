CREATE TABLE IF NOT EXISTS "site_content" (
  "id" serial PRIMARY KEY,
  "locale" text NOT NULL,
  "key" text NOT NULL,
  "value" text NOT NULL,
  "updated_at" timestamptz DEFAULT now() NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS "site_content_locale_key" ON "site_content" ("locale", "key");

CREATE TABLE IF NOT EXISTS "settings" (
  "key" text PRIMARY KEY,
  "value" jsonb NOT NULL,
  "updated_at" timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "projects" (
  "id" serial PRIMARY KEY,
  "slug" text NOT NULL UNIQUE,
  "name" text NOT NULL,
  "cover_url" text,
  "website_url" text,
  "technologies" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "translations" jsonb DEFAULT '{}'::jsonb NOT NULL,
  "featured" boolean DEFAULT false NOT NULL,
  "published" boolean DEFAULT false NOT NULL,
  "sort_order" integer DEFAULT 0 NOT NULL,
  "created_at" timestamptz DEFAULT now() NOT NULL,
  "updated_at" timestamptz DEFAULT now() NOT NULL
);

