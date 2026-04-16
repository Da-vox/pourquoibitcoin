import ArgumentsSection from "@/components/ArgumentsSection";
import BitcoinCalculator from "@/components/BitcoinCalculator";
import CZSection from "@/components/CZSection";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const Arguments = () => {
  return (
    <main className="min-h-screen bg-background">
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
