import ArgumentsSection from "@/components/ArgumentsSection";
import CZSection from "@/components/CZSection";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const Arguments = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <ArgumentsSection />
        <CZSection />
      </div>
      <FooterSection />
    </main>
  );
};

export default Arguments;
