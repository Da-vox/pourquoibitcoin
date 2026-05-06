import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

type RouteMeta = {
  path: string;
  title: string;
  description: string;
  keywords?: string;
};

const SITE_URL = "https://pourquoibitcoin.fr";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const routes: RouteMeta[] = [
  {
    path: "/",
    title: "Pourquoi Bitcoin ? Comprendre Bitcoin simplement en français",
    description:
      "Bitcoin expliqué simplement en français : fondamentaux, arguments, FAQ, sécurisation et guide avancé. La ressource francophone pour comprendre pourquoi Bitcoin est inévitable.",
    keywords:
      "pourquoi bitcoin, comprendre bitcoin, bitcoin français, bitcoin débutant, fondamentaux bitcoin",
  },
  {
    path: "/fondamentaux",
    title: "Fondamentaux de Bitcoin : FAQ, comparatif et quiz | Pourquoi Bitcoin",
    description:
      "Apprends les fondamentaux de Bitcoin : comment ça marche, pourquoi c'est rare, comparatif or vs euros vs BTC, FAQ complète et quiz interactif.",
    keywords: "fondamentaux bitcoin, comment marche bitcoin, faq bitcoin, blockchain, halving",
  },
  {
    path: "/arguments",
    title: "Arguments contre Bitcoin : les contre-arguments rationnels | Pourquoi Bitcoin",
    description:
      "Ponzi, énergie, volatilité, criminels, or, complexité : les critiques contre Bitcoin démontées une par une, avec calculateur d'investissement.",
    keywords: "bitcoin ponzi, bitcoin énergie, contre-arguments bitcoin, calculateur bitcoin",
  },
  {
    path: "/securiser",
    title: "Sécuriser ses bitcoins : guide complet hardware wallet | Pourquoi Bitcoin",
    description:
      "Guide pas à pas pour sécuriser ses bitcoins en self-custody : hardware wallet (Ledger), seed phrase, transferts sans risque.",
    keywords: "sécuriser bitcoin, hardware wallet, ledger, self custody, seed phrase",
  },
  {
    path: "/geek-area",
    title: "Geek Area Bitcoin : nœud, hardware wallet DIY et livre blanc | Pourquoi Bitcoin",
    description:
      "Ressources avancées : monter son nœud Bitcoin Core, construire un hardware wallet DIY SeedSigner et lire le livre blanc de Satoshi.",
    keywords: "geek area bitcoin, nœud bitcoin, seedsigner, livre blanc satoshi",
  },
  {
    path: "/geek-area/noeud-bitcoin",
    title: "Monter son nœud Bitcoin : guide Bitcoin Core pas à pas | Pourquoi Bitcoin",
    description:
      "Guide complet pour installer et configurer un nœud Bitcoin Core : matériel, installation en 9 étapes, connexion wallet via RPC local.",
    keywords: "nœud bitcoin, bitcoin core, full node, RPC, souveraineté bitcoin",
  },
  {
    path: "/geek-area/hardware-wallet",
    title: "Hardware wallet DIY SeedSigner : guide de construction | Pourquoi Bitcoin",
    description:
      "Construis ton propre hardware wallet open source SeedSigner pour moins de 50 € : composants, flashage et workflow QR codes air-gap.",
    keywords: "seedsigner, hardware wallet diy, air-gap bitcoin, qr code signing",
  },
  {
    path: "/geek-area/livre-blanc",
    title: "Livre blanc de Satoshi Nakamoto : résumé chapitre par chapitre | Pourquoi Bitcoin",
    description:
      "Le livre blanc Bitcoin de Satoshi Nakamoto (2008) expliqué chapitre par chapitre en français : transactions, proof of work, arbre de Merkle.",
    keywords: "livre blanc bitcoin, whitepaper bitcoin, satoshi nakamoto, proof of work, merkle tree",
  },
  {
    path: "/geek-area/dictionnaire",
    title: "Dictionnaire Bitcoin Pandul : lexique open source en français | Pourquoi Bitcoin",
    description:
      "Tout le vocabulaire technique de Bitcoin expliqué en français : le meilleur lexique open source pour comprendre les termes du protocole.",
    keywords: "dictionnaire bitcoin, lexique bitcoin, vocabulaire bitcoin, pandul, glossaire bitcoin français",
  },
];

const replaceOrInjectMeta = (html: string, route: RouteMeta): string => {
  const canonical = `${SITE_URL}${route.path === "/" ? "/" : route.path}`;
  let out = html;

  out = out.replace(/<title>[^<]*<\/title>/i, `<title>${route.title}</title>`);

  const replaceMeta = (attr: string, name: string, content: string) => {
    const regex = new RegExp(
      `<meta\\s+${attr}=["']${name}["'][^>]*>`,
      "i",
    );
    const tag = `<meta ${attr}="${name}" content="${content.replace(/"/g, "&quot;")}">`;
    if (regex.test(out)) out = out.replace(regex, tag);
    else out = out.replace("</head>", `    ${tag}\n  </head>`);
  };

  replaceMeta("name", "description", route.description);
  if (route.keywords) replaceMeta("name", "keywords", route.keywords);
  replaceMeta("property", "og:title", route.title);
  replaceMeta("property", "og:description", route.description);
  replaceMeta("property", "og:url", canonical);
  replaceMeta("property", "og:image", OG_IMAGE);
  replaceMeta("name", "twitter:title", route.title);
  replaceMeta("name", "twitter:description", route.description);
  replaceMeta("name", "twitter:image", OG_IMAGE);

  const canonicalRegex = /<link\s+rel=["']canonical["'][^>]*>/i;
  const canonicalTag = `<link rel="canonical" href="${canonical}">`;
  if (canonicalRegex.test(out)) out = out.replace(canonicalRegex, canonicalTag);
  else out = out.replace("</head>", `    ${canonicalTag}\n  </head>`);

  return out;
};

const prerenderPlugin = (): Plugin => ({
  name: "seo-prerender",
  apply: "build",
  closeBundle() {
    const distDir = path.resolve(__dirname, "dist");
    const indexPath = path.join(distDir, "index.html");
    if (!fs.existsSync(indexPath)) return;
    const html = fs.readFileSync(indexPath, "utf-8");
    for (const route of routes) {
      const targetHtml = replaceOrInjectMeta(html, route);
      if (route.path === "/") {
        fs.writeFileSync(indexPath, targetHtml);
        continue;
      }
      const targetDir = path.join(distDir, route.path.replace(/^\//, ""));
      fs.mkdirSync(targetDir, { recursive: true });
      fs.writeFileSync(path.join(targetDir, "index.html"), targetHtml);
    }
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    prerenderPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
