import FundamentalsSection from "@/components/FundamentalsSection";
import FAQSection from "@/components/FAQSection";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const Fondamentaux = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <FundamentalsSection />
        <FAQSection />
      </div>
      <FooterSection />
    </main>
  );
};

export default Fondamentaux;
