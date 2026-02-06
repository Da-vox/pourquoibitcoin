import HeroSection from "@/components/HeroSection";
import FundamentalsSection from "@/components/FundamentalsSection";
import ArgumentsSection from "@/components/ArgumentsSection";
import CZSection from "@/components/CZSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <FundamentalsSection />
      <ArgumentsSection />
      <CZSection />
      <FooterSection />
    </main>
  );
};

export default Index;
