import ArgumentsSection from "@/components/ArgumentsSection";
import BitcoinCalculator from "@/components/BitcoinCalculator";
import CZSection from "@/components/CZSection";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import Seo, { buildBreadcrumb } from "@/components/Seo";

const argumentsJsonLd = buildBreadcrumb([
  { name: "Accueil", path: "/" },
  { name: "Arguments", path: "/arguments" },
]);

const Arguments = () => {
  return (
    <main className="min-h-screen bg-background">
      <Seo
        title="Arguments contre Bitcoin : les contre-arguments rationnels"
        description="Ponzi, énergie, volatilité, criminels, or, complexité : les critiques récurrentes contre Bitcoin démontées une par une, avec calculateur d'investissement et citations clés."
        path="/arguments"
        keywords="bitcoin ponzi, bitcoin énergie, bitcoin criminels, bitcoin volatil, contre-arguments bitcoin, calculateur bitcoin"
        jsonLd={argumentsJsonLd}
      />
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
