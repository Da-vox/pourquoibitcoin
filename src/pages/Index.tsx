import HeroSection from "@/components/HeroSection";
import BtcPriceChart from "@/components/BtcPriceChart";
import LinksSection from "@/components/LinksSection";
import FooterSection from "@/components/FooterSection";
import Navbar from "@/components/Navbar";
import ShareButtons from "@/components/ShareButtons";
import AboutSection from "@/components/AboutSection";
import SitemapSection from "@/components/SitemapSection";
import PageSectionsNav from "@/components/PageSectionsNav";
import { BackgroundPathsCanvas } from "@/components/ui/background-paths";

const Index = () => {
  return (
    <main className="relative min-h-screen isolate">
      <BackgroundPathsCanvas />
      <div className="relative z-10">
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
      </div>
    </main>
  );
};

export default Index;
