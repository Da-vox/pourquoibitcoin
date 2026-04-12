import { Shield, Clock, Globe, Lock, TrendingUp, Zap } from "lucide-react";
import { motion } from "framer-motion";

const fundamentals = [
  {
    icon: Shield,
    title: "Rareté absolue",
    description:
      "21 millions d'unités, gravées dans le code. Aucune banque centrale, aucun gouvernement ne peut en imprimer davantage. C'est mathématique.",
    span: 2,
  },
  {
    icon: Lock,
    title: "Décentralisé",
    description:
      "Plus de 15 000 nœuds à travers le monde. Personne ne contrôle Bitcoin. Pas de CEO, pas de siège social, pas de point de défaillance unique.",
    span: 1,
  },
  {
    icon: Clock,
    title: "15 ans d'historique",
    description:
      "Depuis janvier 2009, le réseau n'a jamais été piraté. 99,98% d'uptime. Aucun système financier ne peut en dire autant.",
    span: 1,
  },
  {
    icon: Globe,
    title: "Sans frontières",
    description:
      "Envoie de la valeur n'importe où sur terre en minutes, 24h/24, 7j/7, sans intermédiaire et pour quelques centimes via Lightning.",
    span: 2,
  },
  {
    icon: TrendingUp,
    title: "Meilleur actif de la décennie",
    description:
      "Performance annualisée supérieure à tout autre actif depuis sa création. L'or numérique surpasse l'or physique.",
    span: 1,
  },
  {
    icon: Zap,
    title: "Lightning Network",
    description:
      "Des millions de transactions par seconde, quasi gratuites. Bitcoin scale en couches, comme Internet (TCP/IP → HTTP → Apps).",
    span: 3,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 22 },
  },
};

const FundamentalsSection = () => {
  return (
    <section id="fondamentaux" className="py-14 md:py-24 relative">
      <div className="container mx-auto px-6">

        {/* Left-aligned header */}
        <div className="mb-10 md:mb-14 max-w-xl">
          <p className="font-mono text-xs tracking-[0.4em] uppercase text-btc-orange mb-4">
            Pourquoi Bitcoin ?
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
            Les fondamentaux
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-[55ch]">
            Comprendre Bitcoin, c'est comprendre pourquoi il est inévitable. Mais notre mission est de vous faire comprendre avant qu'il soit trop tard face aux institutionnels !
          </p>
        </div>

        {/* Bento grid — asymmetric row pattern */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {fundamentals.map((item, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className={`card-spotlight group p-7 rounded-2xl bg-card border border-border transition-all duration-300 hover:border-btc-orange/30 hover:shadow-btc-sm ${
                item.span === 2 ? "md:col-span-2" : item.span === 3 ? "md:col-span-3" : ""
              } ${item.span === 3 ? "flex flex-col md:flex-row md:items-center md:gap-8" : ""}`}
            >
              <div className={item.span === 3 ? "flex-shrink-0" : ""}>
                <div className="w-10 h-10 rounded-xl bg-btc-orange/10 flex items-center justify-center mb-5 group-hover:bg-btc-orange/15 transition-colors duration-300">
                  <item.icon className="w-5 h-5 text-btc-orange" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2.5 tracking-tight">
                  {item.title}
                </h3>
              </div>
              <p className={`text-muted-foreground leading-relaxed text-sm ${item.span === 3 ? "md:mt-0 md:border-l md:border-border/60 md:pl-8" : ""}`}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FundamentalsSection;
