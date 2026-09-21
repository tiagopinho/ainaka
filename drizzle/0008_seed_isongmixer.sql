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
  'isongmixer',
  'iSongMixer — Chinese Lo-fi Studio',
  '/projects/isongmixer/desktop.png',
  '["/projects/isongmixer/desktop.png", "/projects/isongmixer/mobile.png"]'::jsonb,
  'https://isongmixer.vercel.app/',
  '["React", "Web Audio", "MIDI", "PWA"]'::jsonb,
  '{
    "pt-BR": {
      "category": "Estúdio musical / PWA",
      "description": "Estúdio MIDI local e privado para criar arranjos lo-fi diretamente no navegador, com múltiplas faixas, instrumentos, piano roll, controles de mixagem, reprodução, importação MIDI e projetos salvos no dispositivo."
    },
    "en-GB": {
      "category": "Music studio / PWA",
      "description": "A local and private MIDI studio for creating lo-fi arrangements directly in the browser, featuring multiple tracks, instruments, a piano roll, mixing controls, playback, MIDI import and projects saved on the device."
    },
    "es-ES": {
      "category": "Estudio musical / PWA",
      "description": "Estudio MIDI local y privado para crear arreglos lo-fi directamente en el navegador, con múltiples pistas, instrumentos, piano roll, controles de mezcla, reproducción, importación MIDI y proyectos guardados en el dispositivo."
    },
    "fr-FR": {
      "category": "Studio musical / PWA",
      "description": "Studio MIDI local et privé pour créer des arrangements lo-fi directement dans le navigateur, avec plusieurs pistes, instruments, piano roll, contrôles de mixage, lecture, import MIDI et projets enregistrés sur l’appareil."
    }
  }'::jsonb,
  true,
  true,
  5,
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
