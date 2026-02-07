import HeroSection from "@/components/HeroSection";
import BtcPriceChart from "@/components/BtcPriceChart";
import LinksSection from "@/components/LinksSection";
import FooterSection from "@/components/FooterSection";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <BtcPriceChart />
      <LinksSection />
      <FooterSection />
    </main>
  );
};

export default Index;
