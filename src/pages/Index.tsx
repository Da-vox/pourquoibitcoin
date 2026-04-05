import HeroSection from "@/components/HeroSection";
import BtcPriceChart from "@/components/BtcPriceChart";
import BitcoinCalculator from "@/components/BitcoinCalculator";

import LinksSection from "@/components/LinksSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import Navbar from "@/components/Navbar";
import ShareButtons from "@/components/ShareButtons";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <BtcPriceChart />
      <BitcoinCalculator />
      
      <LinksSection />
      <section className="py-12 text-center">
        <p className="text-muted-foreground mb-4 text-sm">Partage ce site à quelqu'un qui a besoin de comprendre Bitcoin :</p>
        <div className="flex justify-center">
          <ShareButtons />
        </div>
      </section>
      <ContactSection />
      <FooterSection />
    </main>
  );
};

export default Index;
