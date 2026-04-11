import FundamentalsSection from "@/components/FundamentalsSection";
import YoutubeVideoSection from "@/components/YoutubeVideoSection";
import ComparisonTable from "@/components/ComparisonTable";
import FAQSection from "@/components/FAQSection";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const Fondamentaux = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <FundamentalsSection />
        <YoutubeVideoSection />
        <ComparisonTable />
        <FAQSection />
      </div>
      <FooterSection />
    </main>
  );
};

export default Fondamentaux;
