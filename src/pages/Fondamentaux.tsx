import FundamentalsSection from "@/components/FundamentalsSection";
import YoutubeVideoSection from "@/components/YoutubeVideoSection";
import ComparisonTable from "@/components/ComparisonTable";
import FAQSection from "@/components/FAQSection";
import WheelQuizSection from "@/components/WheelQuizSection";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import Seo, { buildBreadcrumb } from "@/components/Seo";

const faqEntries = [
  {
    q: "C'est quoi Bitcoin exactement ?",
    a: "Bitcoin est une monnaie numérique décentralisée créée en 2009 par Satoshi Nakamoto. Elle n'est contrôlée par aucune banque centrale et repose sur une blockchain publique et vérifiable.",
  },
  {
    q: "Pourquoi Bitcoin a-t-il de la valeur ?",
    a: "Bitcoin est rare (21 millions max), décentralisé, sécurisé (jamais piraté en 15+ ans) et transférable partout dans le monde. C'est de l'or numérique, divisible et vérifiable.",
  },
  {
    q: "Bitcoin est-il une arnaque ou un Ponzi ?",
    a: "Non. Bitcoin est open-source, sans CEO, sans entreprise derrière. Son code est transparent et vérifiable par n'importe qui. Un Ponzi nécessite un opérateur central, ce que Bitcoin n'a pas.",
  },
  {
    q: "Bitcoin consomme-t-il trop d'énergie ?",
    a: "Environ 58% du minage utilise des énergies renouvelables. Les mineurs exploitent souvent de l'énergie excédentaire. Le système bancaire traditionnel consomme environ 2x plus d'énergie.",
  },
  {
    q: "Comment sécuriser ses bitcoins ?",
    a: "Le plus sûr est un hardware wallet comme Ledger, qui garde tes clés privées hors ligne. La règle d'or : Not your keys, not your coins.",
  },
  {
    q: "Est-il trop tard pour acheter du Bitcoin ?",
    a: "Seuls environ 2% de la population mondiale possède du BTC. Les ETFs ont été approuvés et certains États constituent des réserves. Tu es encore tôt.",
  },
  {
    q: "Les gouvernements peuvent-ils interdire Bitcoin ?",
    a: "La Chine l'a interdit plusieurs fois et Bitcoin continue de fonctionner. Un protocole décentralisé sur des milliers de nœuds dans le monde est très difficile à arrêter.",
  },
];

const fondamentauxJsonLd = [
  buildBreadcrumb([
    { name: "Accueil", path: "/" },
    { name: "Fondamentaux", path: "/fondamentaux" },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqEntries.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

const Fondamentaux = () => {
  return (
    <main className="min-h-screen bg-background">
      <Seo
        title="Fondamentaux de Bitcoin : FAQ, comparatif et quiz"
        description="Apprends les fondamentaux de Bitcoin : comment ça marche, pourquoi c'est rare, comparatif or vs euros vs BTC, FAQ complète et quiz interactif pour valider tes connaissances."
        path="/fondamentaux"
        keywords="fondamentaux bitcoin, comment marche bitcoin, faq bitcoin, blockchain, halving, satoshi, minage"
        jsonLd={fondamentauxJsonLd}
      />
      <Navbar />
      <div className="pt-20">
        <FundamentalsSection />
        <YoutubeVideoSection />
        <ComparisonTable />
        <WheelQuizSection />
        <FAQSection />
      </div>
      <FooterSection />
    </main>
  );
};

export default Fondamentaux;
