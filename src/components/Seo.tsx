import { useEffect } from "react";

export const SITE_URL = "https://pourquoibitcoin.lovable.app";
export const SITE_NAME = "Pourquoi Bitcoin";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

type JsonLd = Record<string, unknown> | Array<Record<string, unknown>>;

export interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  keywords?: string;
  noindex?: boolean;
  jsonLd?: JsonLd;
}

const MANAGED_ATTR = "data-seo-managed";

const setMeta = (
  selector: string,
  attrs: Record<string, string>,
): HTMLElement => {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = document.createElement(selector.startsWith("link") ? "link" : "meta");
    el.setAttribute(MANAGED_ATTR, "true");
    document.head.appendChild(el);
  }
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
};

const setMetaByName = (name: string, content: string) =>
  setMeta(`meta[name="${name}"]`, { name, content });

const setMetaByProperty = (property: string, content: string) =>
  setMeta(`meta[property="${property}"]`, { property, content });

const setLink = (rel: string, href: string, extra: Record<string, string> = {}) =>
  setMeta(`link[rel="${rel}"]${extra.hreflang ? `[hreflang="${extra.hreflang}"]` : ""}`, {
    rel,
    href,
    ...extra,
  });

const setJsonLd = (id: string, data: JsonLd) => {
  const existing = document.getElementById(id);
  if (existing) existing.remove();
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = id;
  script.setAttribute(MANAGED_ATTR, "true");
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
};

const Seo = ({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt = SITE_NAME,
  type = "website",
  keywords,
  noindex = false,
  jsonLd,
}: SeoProps) => {
  useEffect(() => {
    const canonical = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
    const fullTitle = title.includes(SITE_NAME)
      ? title
      : `${title} | ${SITE_NAME}`;

    document.title = fullTitle;
    setMetaByName("description", description);
    if (keywords) setMetaByName("keywords", keywords);
    setMetaByName(
      "robots",
      noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    );

    setLink("canonical", canonical);
    setLink("alternate", canonical, { hreflang: "fr" });
    setLink("alternate", canonical, { hreflang: "x-default" });

    setMetaByProperty("og:type", type);
    setMetaByProperty("og:url", canonical);
    setMetaByProperty("og:title", fullTitle);
    setMetaByProperty("og:description", description);
    setMetaByProperty("og:site_name", SITE_NAME);
    setMetaByProperty("og:locale", "fr_FR");
    setMetaByProperty("og:image", image);
    setMetaByProperty("og:image:alt", imageAlt);

    setMetaByName("twitter:card", "summary_large_image");
    setMetaByName("twitter:title", fullTitle);
    setMetaByName("twitter:description", description);
    setMetaByName("twitter:image", image);
    setMetaByName("twitter:image:alt", imageAlt);

    if (jsonLd) setJsonLd("seo-jsonld", jsonLd);
    else document.getElementById("seo-jsonld")?.remove();
  }, [title, description, path, image, imageAlt, type, keywords, noindex, jsonLd]);

  return null;
};

export const buildBreadcrumb = (
  items: Array<{ name: string; path: string }>,
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: item.name,
    item: `${SITE_URL}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
  })),
});

export default Seo;
