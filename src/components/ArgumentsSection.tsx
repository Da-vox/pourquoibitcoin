import { useState } from "react";
import { ChevronDown, Banknote, TrendingUp, Search, Zap, Landmark, BarChart3, Medal, Crown, Smartphone, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const arguments_list = [
  {
    icon: Banknote,
    attack: "\"Bitcoin ne sert à rien gamin ! C'est de l'argent fictif\"",
    counter:
      "L'euro aussi est \"fictif\" — il n'est adossé à rien depuis 1971 (fin de Bretton Woods). La différence ? L'euro peut être imprimé à l'infini par la BCE. Bitcoin est limité à 21 millions, vérifié par des mathématiques, pas par la confiance en un politicien. Demande-toi : tu préfères faire confiance à un algorithme transparent ou à un banquier central ?",
  },
  {
    icon: TrendingUp,
    attack: "\"C'est trop volatil pour être une monnaie\"",
    counter:
      "La volatilité est le prix de la découverte de prix d'un nouvel actif monétaire mondial. L'or a mis des millénaires à se stabiliser. Bitcoin le fait en accéléré. Sur 4 ans (un cycle de halving), Bitcoin n'a JAMAIS été négatif. Zoome out.",
  },
  {
    icon: Search,
    attack: "\"C'est utilisé que par des criminels\"",
    counter:
      "Moins de 1% des transactions BTC sont illicites (Chainalysis 2024). Le dollar cash ? Utilisé dans 99% du blanchiment mondial. Bitcoin est un registre PUBLIC — chaque transaction est traçable pour l'éternité. C'est le pire outil pour un criminel.",
  },
  {
    icon: Zap,
    attack: "\"Ça pollue énormément (argument de ta belle-sœur écologiste)\"",
    counter:
      "58% du minage utilise des énergies renouvelables (plus que n'importe quelle industrie). Les mineurs consomment de l'énergie EXCÉDENTAIRE que personne d'autre n'utilise. Le système bancaire traditionnel consomme 2x plus d'énergie. Et Bitcoin sécurise 1 700 milliards $ de valeur — c'est de l'énergie bien investie.",
  },
  {
    icon: Landmark,
    attack: "\"Les gouvernements vont l'interdire\"",
    counter:
      "La Chine l'a interdit… 5 fois. Bitcoin n'a jamais été aussi fort. Les USA, le Salvador, la Suisse l'adoptent. Tu ne peux pas arrêter un protocole décentralisé — c'est comme essayer d'interdire Internet en 1995.",
  },
  {
    icon: BarChart3,
    attack: "\"C'est une bulle spéculative / un Ponzi en puissance\"",
    counter:
      "Un Ponzi nécessite un opérateur central qui recrute. Bitcoin n'a pas de CEO. Il est open-source, vérifiable par tous. Chaque \"bulle\" a crashé plus haut que le sommet de la précédente. Si c'est une bulle, c'est la seule bulle de l'histoire qui regonfle toujours plus fort.",
  },
  {
    icon: Medal,
    attack: "\"L'or c'est mieux, c'est tangible\"",
    counter:
      "Comme CZ l'a démontré face à un gold maxi : \"Ton lingot, il est vrai ?\" Tu ne peux pas vérifier la pureté d'un lingot sans le fondre. Bitcoin est vérifiable en une seconde par n'importe qui. Essaie d'envoyer un lingot d'or à l'autre bout du monde en 10 minutes…",
  },
  {
    icon: Crown,
    attack: "\"Il y a des milliers de cryptos, pourquoi Bitcoin ? Je vais devenir millionnaire sur pumpfun\"",
    counter:
      "Il n'y a qu'un seul Bitcoin. Les altcoins ont des fondateurs, des prémines, des VC derrière. Bitcoin est le seul qui a eu une naissance immaculée — sans prévente, sans CEO, avec un créateur disparu. C'est la séparation de la monnaie et de l'État.",
  },
  {
    icon: Smartphone,
    attack: "\"C'est trop compliqué / trop technique avec bitnakamoto\"",
    counter:
      "Tu comprends comment fonctionne le protocole TCP/IP ? Non. Pourtant tu utilises Internet tous les jours. Tu n'as pas besoin de comprendre la cryptographie pour utiliser Bitcoin. Il y a des apps aussi simples que Venmo.",
  },
  {
    icon: Clock,
    attack: "\"C'est trop tard pour acheter\"",
    counter:
      "On disait ça à 100$, à 1 000$, à 10 000$, à 50 000$. Seuls 2% de la population mondiale possède du BTC. Les ETFs viennent d'être approuvés. Les États commencent à constituer des réserves. Tu n'es pas en retard — tu es encore tôt.",
  },
];

const ArgumentCard = ({
  icon: Icon,
  attack,
  counter,
  index,
}: {
  icon: React.ElementType;
  attack: string;
  counter: string;
  index: number;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 100, damping: 22, delay: index * 0.04 }}
      className={`border-t border-border transition-colors duration-200 ${open ? "border-btc-orange/30" : "hover:border-btc-orange/20"}`}
    >
      <button
        className="w-full flex items-center gap-4 py-5 text-left cursor-pointer active:scale-[0.995] transition-transform duration-100"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
          <Icon className={`w-4 h-4 transition-colors duration-200 ${open ? "text-btc-orange" : "text-muted-foreground"}`} strokeWidth={1.5} />
        </span>
        <p className="text-foreground font-medium flex-1 text-base leading-snug">{attack}</p>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 28 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
            className="overflow-hidden"
          >
            <p className="text-muted-foreground leading-relaxed text-sm pb-6 pl-12">
              {counter}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ArgumentsSection = () => {
  return (
    <section id="arguments" className="py-24 bg-btc-dark">
      <div className="container mx-auto px-6">

        {/* Left-aligned header */}
        <div className="mb-12 max-w-2xl">
          <p className="font-mono text-xs tracking-[0.4em] uppercase text-btc-orange mb-4">
            Le guide anti-oncle
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
            10 arguments pour le
            <br />
            prochain repas de famille
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-[55ch]">
            Clique sur chaque attaque pour découvrir la réponse qui fera taire
            ton oncle, ton banquier, et le journaliste de BFM.
          </p>
        </div>

        <div className="max-w-3xl">
          {arguments_list.map((arg, i) => (
            <ArgumentCard key={i} index={i} {...arg} />
          ))}
          {/* closing border */}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
};

export default ArgumentsSection;
