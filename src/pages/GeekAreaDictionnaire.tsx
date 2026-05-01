import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ShareButtons from "@/components/ShareButtons";
import Seo, { buildBreadcrumb, SITE_URL } from "@/components/Seo";
import {
  BookA,
  ArrowLeft,
  Server,
  Cpu,
  BookOpen,
  ExternalLink,
  Globe,
  Github,
  Users,
  CheckCircle,
  Search,
} from "lucide-react";

const dictionnaireJsonLd = [
  buildBreadcrumb([
    { name: "Accueil", path: "/" },
    { name: "Geek Area", path: "/geek-area" },
    { name: "Dictionnaire Bitcoin", path: "/geek-area/dictionnaire" },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}/geek-area/dictionnaire#article`,
    headline:
      "Le dictionnaire Bitcoin : la meilleure ressource open source francophone sur Bitcoin",
    description:
      "Présentation du dictionnaire Bitcoin de Loïc Morel : la référence open source en français pour comprendre tout le vocabulaire technique de Bitcoin.",
    inLanguage: "fr-FR",
    publisher: {
      "@type": "Organization",
      name: "Pourquoi Bitcoin",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg` },
    },
    image: `${SITE_URL}/og-image.jpg`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/geek-area/dictionnaire`,
    },
    about: {
      "@type": "WebSite",
      name: "Dictionnaire Bitcoin",
      url: "https://pandul.fr/dictionnaire/",
      inLanguage: "fr-FR",
    },
    keywords: [
      "dictionnaire bitcoin",
      "lexique bitcoin",
      "pandul",
      "bitcoin français",
      "vocabulaire bitcoin",
    ],
  },
];

const features = [
  {
    icon: Globe,
    title: "100 % en français",
    description:
      "Chaque terme du protocole Bitcoin (UTXO, mempool, hashrate, taproot, lightning…) est traduit, défini et vulgarisé en français clair, sans jargon inutile.",
  },
  {
    icon: Github,
    title: "Open source et auditable",
    description:
      "Les définitions sont publiées sous licence libre. N'importe qui peut consulter le code source, proposer une correction ou enrichir une entrée via une pull request.",
  },
  {
    icon: Users,
    title: "Maintenu par la communauté",
    description:
      "Ce dictionnaire est animé par des bitcoiners francophones passionnés leadé par Loïc Morel. Le dictionnaire évolue en continu avec le protocole et les nouveaux concepts (BIP, soft forks, etc.).",
  },
  {
    icon: Search,
    title: "Une vraie ressource pédagogique",
    description:
      "Idéal pour débuter, approfondir ou vérifier un terme avant un échange technique. C'est le compagnon parfait pour lire le livre blanc, monter un nœud ou comprendre un thread X.",
  },
];

const otherSections = [
  {
    icon: Server,
    title: "Nœud Bitcoin",
    description:
      "Guide complet pour installer Bitcoin Core et valider toi-même les transactions.",
    href: "/geek-area/noeud-bitcoin",
  },
  {
    icon: Cpu,
    title: "Hardware Wallet DIY",
    description:
      "Construis ton propre portefeuille matériel open source avec SeedSigner pour moins de 50 €.",
    href: "/geek-area/hardware-wallet",
  },
  {
    icon: BookOpen,
    title: "Livre Blanc de Satoshi",
    description:
      "Le document fondateur de Bitcoin expliqué simplement, chapitre par chapitre.",
    href: "/geek-area/livre-blanc",
  },
];

const GeekAreaDictionnaire = () => {
  return (
    <main className="min-h-screen bg-background">
      <Seo
        title="Dictionnaire Bitcoin : le meilleur lexique open source en français"
        description="Cela propose le meilleur dictionnaire Bitcoin open source en français : tout le vocabulaire technique du protocole expliqué clairement, maintenu par la communauté francophone."
        path="/geek-area/dictionnaire"
        keywords="dictionnaire bitcoin, lexique bitcoin, pandul, bitcoin français, vocabulaire bitcoin, glossaire bitcoin"
        type="article"
        articleSection="Geek Area"
        publishedTime="2026-04-28T00:00:00+02:00"
        modifiedTime="2026-04-28T00:00:00+02:00"
        jsonLd={dictionnaireJsonLd}
      />
      <Navbar />
      <div className="pt-20">
        {/* ── Breadcrumb ── */}
        <div className="border-b border-border">
          <div className="container mx-auto px-6 py-3">
            <Link
              to="/geek-area"
              className="inline-flex items-center gap-2 text-btc-orange text-sm font-medium hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à Geek Area
            </Link>
          </div>
        </div>

        {/* ── Hero ── */}
        <section className="py-14 md:py-24">
          <div className="container mx-auto px-6 text-center">
            <div className="w-14 h-14 rounded-xl bg-gradient-btc flex items-center justify-center mx-auto mb-6">
              <BookA className="w-7 h-7 text-primary-foreground" />
            </div>
            <p className="font-mono text-sm tracking-[0.3em] uppercase text-btc-orange mb-4">
              Section 04 - Geek Area
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Le{" "}
              <span className="text-gradient-btc">dictionnaire Bitcoin</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-6">
              Le meilleur dictionnaire <strong>open source</strong> et{" "}
              <strong>francophone</strong> dédié à Bitcoin. Tout le vocabulaire
              technique du protocole, expliqué clairement et maintenu par la
              communauté.
            </p>
            <a
              href="https://pandul.fr/dictionnaire/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-btc text-primary-foreground font-semibold text-sm transition-all hover:scale-105 glow-btc"
            >
              Ouvrir pandul.fr/dictionnaire
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* ══ Pourquoi Pandul ══ */}
        <section className="py-14 md:py-20 border-t border-border">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto mb-14 text-center">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                Pourquoi c'est{" "}
                <span className="text-gradient-btc">la référence</span> en
                français
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                Bitcoin a son propre vocabulaire et la majorité des ressources
                techniques sont en anglais. Loïc comble ce vide avec un
                lexique précis, libre et constamment mis à jour.
              </p>
            </div>

            <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-5">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-card/50 p-6 hover:border-btc-orange/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-btc flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h3 className="font-bold text-foreground text-base">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ Comment l'utiliser ══ */}
        <section className="py-14 md:py-20 border-t border-border">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
                Comment l'<span className="text-gradient-btc">utiliser</span>
              </h2>
              <ul className="space-y-3">
                {[
                  "Tu lis un article ou un thread sur Bitcoin et tu bloques sur un terme ? Cherche-le directement sur pandul.fr/dictionnaire.",
                  "Tu prépares un exposé, un article ou un cours en français : Ce dictionnaire est une source citable et libre de droits.",
                  "Tu veux contribuer ? Le dépôt est ouvert sur GitHub : tu peux corriger une faute, clarifier une définition ou en ajouter une nouvelle.",
                  "Couple-le avec le livre blanc de Satoshi : chaque concept croisé dans le whitepaper a sa fiche détaillée.",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card/50"
                  >
                    <CheckCircle className="w-5 h-5 text-btc-orange flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── CTA externe ── */}
        <section className="py-14 border-t border-border">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center rounded-xl border border-btc-orange/30 bg-card p-10 glow-btc-sm">
              <BookA className="w-10 h-10 text-btc-orange mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-3">
                Plonge dans le dictionnaire
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Toutes les définitions sont accessibles gratuitement sur le site. Ajoute-le à tes favoris : tu y reviendras souvent.
              </p>
              <a
                href="https://pandul.fr/dictionnaire/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-btc text-primary-foreground font-semibold text-sm transition-all hover:scale-105 glow-btc"
              >
                pandul.fr/dictionnaire <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ── Autres sections ── */}
        <section className="py-14 border-t border-border">
          <div className="container mx-auto px-6">
            <h2 className="text-xl font-bold text-foreground text-center mb-8">
              Continuer dans la{" "}
              <span className="text-gradient-btc">Geek Area</span>
            </h2>
            <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {otherSections.map((section, i) => (
                <Link
                  key={i}
                  to={section.href}
                  className="rounded-xl border border-border bg-card/50 p-6 hover:border-btc-orange/30 transition-colors group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-btc flex items-center justify-center flex-shrink-0">
                      <section.icon className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <h3 className="font-bold text-foreground group-hover:text-btc-orange transition-colors">
                      {section.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {section.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Partage ── */}
        <section className="py-12 border-t border-border">
          <div className="container mx-auto px-6 text-center">
            <p className="text-muted-foreground text-sm mb-4">
              Partage le dictionnaire Bitcoin avec d'autres bitcoiners
            </p>
            <ShareButtons title="Le dictionnaire Bitcoin de Loïc Morel- Geek Area" />
          </div>
        </section>
      </div>
      <FooterSection />
    </main>
  );
};

export default GeekAreaDictionnaire;
