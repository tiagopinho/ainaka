INSERT INTO "projects" (
  "slug",
  "name",
  "cover_url",
  "gallery_urls",
  "website_url",
  "technologies",
  "translations",
  "featured",
  "published",
  "sort_order",
  "updated_at"
)
VALUES (
  'hydrotower',
  'HydroTower',
  '/projects/hydrotower/desktop.png',
  '["/projects/hydrotower/desktop.png", "/projects/hydrotower/mobile.png"]'::jsonb,
  'https://hydrotower.netlify.app/',
  '["React", "PWA", "Design responsivo", "Netlify"]'::jsonb,
  '{
    "pt-BR": {
      "category": "Aplicação web / PWA",
      "description": "Aplicação web que orienta o cultivo hidropônico doméstico, da montagem da torre à primeira colheita, organizando os cuidados com água, pH, nutrientes e tarefas recorrentes."
    },
    "en-GB": {
      "category": "Web application / PWA",
      "description": "A web application that guides home hydroponic growing, from assembling the tower to the first harvest, organising water, pH, nutrient care and recurring tasks."
    },
    "es-ES": {
      "category": "Aplicación web / PWA",
      "description": "Aplicación web que guía el cultivo hidropónico doméstico, desde el montaje de la torre hasta la primera cosecha, organizando los cuidados del agua, el pH, los nutrientes y las tareas recurrentes."
    },
    "fr-FR": {
      "category": "Application web / PWA",
      "description": "Application web qui guide la culture hydroponique à domicile, du montage de la tour à la première récolte, en organisant le suivi de l’eau, du pH, des nutriments et des tâches récurrentes."
    }
  }'::jsonb,
  true,
  true,
  2,
  now()
)
ON CONFLICT ("slug") DO UPDATE SET
  "name" = EXCLUDED."name",
  "cover_url" = EXCLUDED."cover_url",
  "gallery_urls" = EXCLUDED."gallery_urls",
  "website_url" = EXCLUDED."website_url",
  "technologies" = EXCLUDED."technologies",
  "translations" = EXCLUDED."translations",
  "featured" = EXCLUDED."featured",
  "published" = EXCLUDED."published",
  "sort_order" = EXCLUDED."sort_order",
  "updated_at" = now();
