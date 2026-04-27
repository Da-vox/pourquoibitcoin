import ArgumentsSection from "@/components/ArgumentsSection";
import BitcoinCalculator from "@/components/BitcoinCalculator";
import CZSection from "@/components/CZSection";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import Seo, { buildBreadcrumb, SITE_URL } from "@/components/Seo";

const argumentsJsonLd = [
  buildBreadcrumb([
    { name: "Accueil", path: "/" },
    { name: "Arguments", path: "/arguments" },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}/arguments#article`,
    headline: "Arguments contre Bitcoin : les contre-arguments rationnels",
    description:
      "Ponzi, énergie, volatilité, criminels, or, complexité : les critiques récurrentes contre Bitcoin démontées une par une, avec calculateur d'investissement et citations clés.",
    inLanguage: "fr-FR",
    datePublished: "2025-01-01",
    dateModified: "2026-04-27",
    author: { "@type": "Organization", name: "Pourquoi Bitcoin", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Pourquoi Bitcoin",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/arguments` },
    image: `${SITE_URL}/og-image.jpg`,
    keywords: [
      "bitcoin ponzi",
      "bitcoin énergie",
      "bitcoin criminels",
      "bitcoin volatil",
      "contre-arguments bitcoin",
    ],
  },
];

const Arguments = () => {
  return (
    <main className="min-h-screen bg-background">
      <Seo
        title="Arguments contre Bitcoin : les contre-arguments rationnels"
        description="Ponzi, énergie, volatilité, criminels, or, complexité : les critiques récurrentes contre Bitcoin démontées une par une, avec calculateur d'investissement et citations clés."
        path="/arguments"
        keywords="bitcoin ponzi, bitcoin énergie, bitcoin criminels, bitcoin volatil, contre-arguments bitcoin, calculateur bitcoin, bitcoin vs or"
        type="article"
        articleSection="Arguments"
        publishedTime="2025-01-01T00:00:00+01:00"
        modifiedTime="2026-04-27T00:00:00+02:00"
        jsonLd={argumentsJsonLd}
      />
      <Navbar />
      <div className="pt-20">
        <ArgumentsSection />
        <BitcoinCalculator />
        <CZSection />
      </div>
      <FooterSection />
    </main>
  );
};

export default Arguments;
