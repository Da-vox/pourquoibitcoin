import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "C'est quoi Bitcoin exactement ?",
    answer:
      "Bitcoin est une monnaie numérique décentralisée créée en 2009 par un anonyme sous le pseudonyme Satoshi Nakamoto. Contrairement à l'euro ou au dollar, elle n'est contrôlée par aucune banque centrale. Imagine un grand livre de comptes public, vérifiable par tout le monde, impossible à falsifier — c'est la blockchain.",
  },
  {
    question: "Pourquoi Bitcoin a-t-il de la valeur ?",
    answer:
      "Bitcoin a de la valeur car il est rare (limité à 21 millions d'unités), décentralisé (personne ne le contrôle), sécurisé (jamais piraté en 15+ ans) et facilement transférable dans le monde entier. C'est de l'or numérique, mais en mieux : vérifiable, divisible et transportable instantanément.",
  },
  {
    question: "Bitcoin, c'est une arnaque / un Ponzi ?",
    answer:
      "Non. Un Ponzi nécessite un opérateur central qui recrute de nouveaux investisseurs pour payer les anciens. Bitcoin est open-source, sans CEO, sans entreprise derrière. Son code est transparent et vérifiable par n'importe qui. Chaque cycle a touché un nouveau sommet historique.",
  },
  {
    question: "Est-ce que ça consomme trop d'énergie ?",
    answer:
      "58% du minage utilise des énergies renouvelables — plus que n'importe quelle autre industrie. Les mineurs consomment souvent de l'énergie excédentaire que personne d'autre n'utilise. Le système bancaire traditionnel consomme environ 2x plus d'énergie que Bitcoin.",
  },
  {
    question: "Comment stocker / sécuriser ses bitcoins ?",
    answer:
      "Le plus sûr est d'utiliser un hardware wallet (portefeuille physique) comme Ledger. Il garde tes clés privées hors ligne, à l'abri des hackers. La règle d'or : \"Not your keys, not your coins\" — si tu laisses tes BTC sur un exchange, ils ne t'appartiennent pas vraiment.",
  },
  {
    question: "C'est trop tard pour acheter du Bitcoin ?",
    answer:
      "On disait ça à 100 $, à 1 000 $, à 10 000 $, à 50 000 $. Seuls ~2% de la population mondiale possède du BTC. Les ETFs viennent d'être approuvés, les États commencent à constituer des réserves. Tu n'es pas en retard — tu es encore tôt.",
  },
  {
    question: "Les gouvernements peuvent-ils interdire Bitcoin ?",
    answer:
      "La Chine l'a interdit… 5 fois. Bitcoin n'a jamais été aussi fort. Tu ne peux pas arrêter un protocole décentralisé qui tourne sur des milliers de nœuds dans le monde — c'est comme essayer d'interdire Internet en 1995.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-mono text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Questions fréquentes
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-display">
            <span className="text-gradient-btc">FAQ</span> Bitcoin
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Les réponses aux questions que tout le monde se pose.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-xl glass-card px-6 hover:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-secondary-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
