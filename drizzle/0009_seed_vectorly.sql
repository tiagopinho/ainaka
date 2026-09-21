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
  'vectorly',
  'Vectorly — JPG to SVG',
  '/projects/vectorly/desktop.png',
  '["/projects/vectorly/desktop.png", "/projects/vectorly/mobile.png"]'::jsonb,
  'https://jpgtosvg.vercel.app/',
  '["Next.js", "React", "SVG", "PWA"]'::jsonb,
  '{
    "pt-BR": {
      "category": "Ferramenta criativa / PWA",
      "description": "Ferramenta local e privada para transformar imagens JPG e PNG em arquivos SVG limpos e PDFs vetoriais, com ajustes de cores, suavização, escala, remoção de fundo e filtro de linhas."
    },
    "en-GB": {
      "category": "Creative tool / PWA",
      "description": "A local and private tool for converting JPG and PNG images into clean SVG files and vector PDFs, with colour, smoothing and scale controls, background removal and line filtering."
    },
    "es-ES": {
      "category": "Herramienta creativa / PWA",
      "description": "Herramienta local y privada para convertir imágenes JPG y PNG en archivos SVG limpios y PDF vectoriales, con ajustes de colores, suavizado, escala, eliminación de fondo y filtrado de líneas."
    },
    "fr-FR": {
      "category": "Outil créatif / PWA",
      "description": "Outil local et privé permettant de convertir des images JPG et PNG en fichiers SVG propres et PDF vectoriels, avec réglages des couleurs, du lissage et de l’échelle, suppression de l’arrière-plan et filtrage des lignes."
    }
  }'::jsonb,
  true,
  true,
  6,
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
