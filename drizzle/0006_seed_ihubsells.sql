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
  'ihubsells',
  'iHubSells',
  '/projects/ihubsells/logo.jpg',
  '["/projects/ihubsells/logo.jpg"]'::jsonb,
  'https://ihubsells.vercel.app/',
  '["React", "PWA", "Offline-first", "Vercel"]'::jsonb,
  '{
    "pt-BR": {
      "category": "Plataforma de gestão / PWA",
      "description": "Plataforma privada para centralizar e controlar anúncios em diferentes marketplaces, com experiência offline. O produto está em evolução para futuramente oferecer cadastro aberto, plano gratuito e funcionalidades pagas."
    },
    "en-GB": {
      "category": "Management platform / PWA",
      "description": "A private platform for centralising and managing listings across different marketplaces, with offline support. The product is evolving towards open registration, a free plan and paid features in the future."
    },
    "es-ES": {
      "category": "Plataforma de gestión / PWA",
      "description": "Plataforma privada para centralizar y gestionar anuncios en diferentes marketplaces, con funcionamiento offline. El producto evoluciona para ofrecer en el futuro registro abierto, un plan gratuito y funciones de pago."
    },
    "fr-FR": {
      "category": "Plateforme de gestion / PWA",
      "description": "Plateforme privée permettant de centraliser et gérer les annonces sur différentes marketplaces, avec un fonctionnement hors ligne. Le produit évolue vers une inscription ouverte, une offre gratuite et des fonctionnalités payantes."
    }
  }'::jsonb,
  true,
  true,
  3,
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
