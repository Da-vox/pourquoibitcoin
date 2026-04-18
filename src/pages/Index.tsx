import HeroSection from "@/components/HeroSection";
import BtcPriceChart from "@/components/BtcPriceChart";
import LinksSection from "@/components/LinksSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import Navbar from "@/components/Navbar";
import ShareButtons from "@/components/ShareButtons";
import AboutSection from "@/components/AboutSection";
import PageSectionsNav from "@/components/PageSectionsNav";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
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

      <div id="contact">
        <ContactSection />
      </div>

      <FooterSection />

      {/* Navigation inter-sections flottante (apparaît après le hero) */}
      <PageSectionsNav />
    </main>
  );
};

export default Index;
