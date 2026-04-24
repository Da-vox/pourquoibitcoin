import HeroSection from "@/components/HeroSection";
import BtcPriceChart from "@/components/BtcPriceChart";
import LinksSection from "@/components/LinksSection";
import FooterSection from "@/components/FooterSection";
import Navbar from "@/components/Navbar";
import ShareButtons from "@/components/ShareButtons";
import AboutSection from "@/components/AboutSection";
import SitemapSection from "@/components/SitemapSection";
import PageSectionsNav from "@/components/PageSectionsNav";
import Seo, { SITE_URL, SITE_NAME } from "@/components/Seo";

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: "Pourquoi Bitcoin ? Comprendre Bitcoin simplement en français",
      description:
        "Bitcoin expliqué simplement en français : fondamentaux, arguments, FAQ, sécurisation et guide avancé.",
      inLanguage: "fr-FR",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      primaryImageOfPage: { "@id": `${SITE_URL}/#ogimage` },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "fr-FR",
      publisher: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/og-image.jpg`,
    },
    {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#ogimage`,
      url: `${SITE_URL}/og-image.jpg`,
      width: 1200,
      height: 630,
    },
  ],
};

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Seo
        title="Pourquoi Bitcoin ? Comprendre Bitcoin simplement en français"
        description="Bitcoin expliqué simplement en français : fondamentaux, arguments, FAQ, sécurisation et guide avancé. La ressource francophone pour comprendre pourquoi Bitcoin est inévitable."
        path="/"
        keywords="pourquoi bitcoin, comprendre bitcoin, bitcoin français, bitcoin débutant, fondamentaux bitcoin, prix bitcoin"
        jsonLd={homeJsonLd}
      />
      <Navbar />

      {/* Hero - ancre pour la détection scroll de PageSectionsNav */}
      <div id="hero">
        <HeroSection />
      </div>

      <div id="prix">
        <BtcPriceChart />
      </div>

      <div id="ressources">
        <LinksSection />
      </div>

      <div id="apropos">
        <AboutSection />
      </div>

      <section className="py-8 text-center">
        <p className="text-muted-foreground mb-4 text-sm">
          Partage ce site à quelqu'un qui a besoin de comprendre Bitcoin :
        </p>
        <div className="flex justify-center">
          <ShareButtons />
        </div>
      </section>

      <div id="plan-du-site">
        <SitemapSection />
      </div>

      <FooterSection />

      {/* Navigation inter-sections flottante (apparaît après le hero) */}
      <PageSectionsNav />
    </main>
  );
};

export default Index;
