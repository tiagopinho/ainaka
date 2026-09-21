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
  'weboth',
  'Weboth — Nós',
  '/projects/weboth/desktop.png',
  '["/projects/weboth/desktop.png", "/projects/weboth/mobile.png"]'::jsonb,
  'https://weboth.web.app/',
  '["React", "Firebase", "Firestore", "PWA"]'::jsonb,
  '{
    "pt-BR": {
      "category": "Aplicativo colaborativo / PWA",
      "description": "Aplicativo de lembretes compartilhados para a vida a dois, com espaços por convite, atribuição de responsabilidades, calendário, histórico, notificações e opções para adiar ou compartilhar cada lembrete."
    },
    "en-GB": {
      "category": "Collaborative application / PWA",
      "description": "A shared reminders app for couples, featuring invite-only spaces, responsibility assignment, calendar, history, notifications, and options to postpone or share each reminder."
    },
    "es-ES": {
      "category": "Aplicación colaborativa / PWA",
      "description": "Aplicación de recordatorios compartidos para la vida en pareja, con espacios por invitación, asignación de responsabilidades, calendario, historial, notificaciones y opciones para posponer o compartir cada recordatorio."
    },
    "fr-FR": {
      "category": "Application collaborative / PWA",
      "description": "Application de rappels partagés pour la vie à deux, avec espaces sur invitation, attribution des responsabilités, calendrier, historique, notifications et options pour reporter ou partager chaque rappel."
    }
  }'::jsonb,
  true,
  true,
  4,
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
