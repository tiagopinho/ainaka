CREATE TABLE IF NOT EXISTS "briefings" (
  "id" serial PRIMARY KEY,
  "contact_name" text NOT NULL,
  "company_name" text NOT NULL,
  "email" text NOT NULL,
  "whatsapp" text NOT NULL,
  "status" text DEFAULT 'new' NOT NULL,
  "answers" jsonb NOT NULL,
  "internal_notes" text DEFAULT '' NOT NULL,
  "created_at" timestamptz DEFAULT now() NOT NULL,
  "updated_at" timestamptz DEFAULT now() NOT NULL
);

