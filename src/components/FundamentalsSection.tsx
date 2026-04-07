import { Shield, Clock, Globe, Lock, TrendingUp, Zap } from "lucide-react";

const fundamentals = [
  {
    icon: Shield,
    title: "Rareté absolue",
    description:
      "21 millions d'unités, gravées dans le code. Aucune banque centrale, aucun gouvernement ne peut en imprimer davantage. C'est mathématique.",
  },
  {
    icon: Lock,
    title: "Décentralisé",
    description:
      "Plus de 15 000 nœuds à travers le monde. Personne ne contrôle Bitcoin. Pas de CEO, pas de siège social, pas de point de défaillance unique.",
  },
  {
    icon: Clock,
    title: "15 ans d'historique",
    description:
      "Depuis janvier 2009, le réseau n'a jamais été piraté. 99,98% d'uptime. Aucun système financier ne peut en dire autant.",
  },
  {
    icon: Globe,
    title: "Sans frontières",
    description:
      "Envoie de la valeur n'importe où sur terre en minutes, 24h/24, 7j/7, sans intermédiaire et pour quelques centimes via Lightning.",
  },
  {
    icon: TrendingUp,
    title: "Meilleur actif de la décennie",
    description:
      "Performance annualisée supérieure à tout autre actif depuis sa création. L'or numérique surpasse l'or physique.",
  },
  {
    icon: Zap,
    title: "Lightning Network",
    description:
      "Des millions de transactions par seconde, quasi gratuites. Bitcoin scale en couches, comme Internet (TCP/IP → HTTP → Apps).",
  },
];

const FundamentalsSection = () => {
  return (
    <section id="fondamentaux" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-mono text-sm tracking-[0.3em] uppercase text-btc-orange mb-4">
            Pourquoi Bitcoin ?
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Les <span className="text-gradient-btc">fondamentaux</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Comprendre Bitcoin, c'est comprendre pourquoi il est inévitable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fundamentals.map((item, i) => (
            <div
              key={i}
              className="group p-8 rounded-xl bg-card border border-border hover:border-btc-orange/40 transition-all duration-300 hover:glow-btc-sm"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-btc flex items-center justify-center mb-5">
                <item.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FundamentalsSection;
