import { useEffect } from "react";

export const SITE_URL = "https://pourquoibitcoin.fr";
export const SITE_NAME = "Pourquoi Bitcoin";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;

type JsonLd = Record<string, unknown> | Array<Record<string, unknown>>;

export interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  type?: "website" | "article";
  keywords?: string;
  noindex?: boolean;
  jsonLd?: JsonLd;
  publishedTime?: string;
  modifiedTime?: string;
  articleSection?: string;
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

const removeMetaByProperty = (property: string) => {
  document.head.querySelector(`meta[property="${property}"]`)?.remove();
};

const removeMetaByName = (name: string) => {
  document.head.querySelector(`meta[name="${name}"]`)?.remove();
};

const detectImageMime = (url: string): string => {
  const lower = url.toLowerCase();
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".gif")) return "image/gif";
  if (lower.endsWith(".svg")) return "image/svg+xml";
  return "image/jpeg";
};

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
  imageWidth = DEFAULT_OG_IMAGE_WIDTH,
  imageHeight = DEFAULT_OG_IMAGE_HEIGHT,
  type = "website",
  keywords,
  noindex = false,
  jsonLd,
  publishedTime,
  modifiedTime,
  articleSection,
}: SeoProps) => {
  useEffect(() => {
    const canonical = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
    const fullTitle = title.includes(SITE_NAME)
      ? title
      : `${title} | ${SITE_NAME}`;

    document.title = fullTitle;
    setMetaByName("description", description);
    if (keywords) setMetaByName("keywords", keywords);
    else removeMetaByName("keywords");
    setMetaByName(
      "robots",
      noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    );
    setMetaByName(
      "googlebot",
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
    setMetaByProperty("og:image:secure_url", image);
    setMetaByProperty("og:image:type", detectImageMime(image));
    setMetaByProperty("og:image:width", String(imageWidth));
    setMetaByProperty("og:image:height", String(imageHeight));
    setMetaByProperty("og:image:alt", imageAlt);

    if (type === "article") {
      if (publishedTime) setMetaByProperty("article:published_time", publishedTime);
      else removeMetaByProperty("article:published_time");
      if (modifiedTime) setMetaByProperty("article:modified_time", modifiedTime);
      else removeMetaByProperty("article:modified_time");
      if (articleSection) setMetaByProperty("article:section", articleSection);
      else removeMetaByProperty("article:section");
    } else {
      removeMetaByProperty("article:published_time");
      removeMetaByProperty("article:modified_time");
      removeMetaByProperty("article:section");
    }

    setMetaByName("twitter:card", "summary_large_image");
    setMetaByName("twitter:title", fullTitle);
    setMetaByName("twitter:description", description);
    setMetaByName("twitter:image", image);
    setMetaByName("twitter:image:alt", imageAlt);

    if (jsonLd) setJsonLd("seo-jsonld", jsonLd);
    else document.getElementById("seo-jsonld")?.remove();
  }, [
    title,
    description,
    path,
    image,
    imageAlt,
    imageWidth,
    imageHeight,
    type,
    keywords,
    noindex,
    jsonLd,
    publishedTime,
    modifiedTime,
    articleSection,
  ]);

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
