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
  'ailucrei',
  'AiLucrei',
  '/projects/ailucrei/desktop.png',
  '["/projects/ailucrei/desktop.png", "/projects/ailucrei/mobile.png"]'::jsonb,
  'https://ailucrei.com.br/',
  '["React", "PWA", "Design responsivo", "Netlify"]'::jsonb,
  '{
    "pt-BR": {
      "category": "Aplicação web / SaaS",
      "description": "Plataforma web que ajuda vendedores a calcular preços de venda e margens com mais precisão, considerando comissões, impostos, frete, embalagem, cupons e regras específicas de diferentes marketplaces."
    },
    "en-GB": {
      "category": "Web application / SaaS",
      "description": "A web platform that helps sellers calculate selling prices and margins more accurately, accounting for commissions, taxes, shipping, packaging, coupons and marketplace-specific rules."
    },
    "es-ES": {
      "category": "Aplicación web / SaaS",
      "description": "Plataforma web que ayuda a vendedores a calcular precios y márgenes con mayor precisión, considerando comisiones, impuestos, envíos, embalaje, cupones y reglas específicas de cada marketplace."
    },
    "fr-FR": {
      "category": "Application web / SaaS",
      "description": "Plateforme web qui aide les vendeurs à calculer leurs prix et leurs marges avec précision, en tenant compte des commissions, taxes, livraisons, emballages, coupons et règles propres à chaque marketplace."
    }
  }'::jsonb,
  true,
  true,
  1,
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
