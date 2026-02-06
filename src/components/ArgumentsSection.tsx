import { useState } from "react";
import { ChevronDown } from "lucide-react";

const arguments_list = [
  {
    attack: "\"Bitcoin ne sert à rien, c'est de l'argent fictif\"",
    counter:
      "L'euro aussi est \"fictif\" — il n'est adossé à rien depuis 1971 (fin de Bretton Woods). La différence ? L'euro peut être imprimé à l'infini par la BCE. Bitcoin est limité à 21 millions, vérifié par des mathématiques, pas par la confiance en un politicien. Demande-toi : tu préfères faire confiance à un algorithme transparent ou à un banquier central ?",
    emoji: "💸",
  },
  {
    attack: "\"C'est trop volatil pour être une monnaie\"",
    counter:
      "La volatilité est le prix de la découverte de prix d'un nouvel actif monétaire mondial. L'or a mis des millénaires à se stabiliser. Bitcoin le fait en accéléré. Sur 4 ans (un cycle de halving), Bitcoin n'a JAMAIS été négatif. Zoome out.",
    emoji: "📈",
  },
  {
    attack: "\"C'est utilisé par les criminels\"",
    counter:
      "Moins de 1% des transactions BTC sont illicites (Chainalysis 2024). Le dollar cash ? Utilisé dans 99% du blanchiment mondial. Bitcoin est un registre PUBLIC — chaque transaction est traçable pour l'éternité. C'est le pire outil pour un criminel.",
    emoji: "🔍",
  },
  {
    attack: "\"Ça pollue énormément\"",
    counter:
      "58% du minage utilise des énergies renouvelables (plus que n'importe quelle industrie). Les mineurs consomment de l'énergie EXCÉDENTAIRE que personne d'autre n'utilise. Le système bancaire traditionnel consomme 2x plus d'énergie. Et Bitcoin sécurise 1 700 milliards $ de valeur — c'est de l'énergie bien investie.",
    emoji: "⚡",
  },
  {
    attack: "\"Les gouvernements vont l'interdire\"",
    counter:
      "La Chine l'a interdit… 5 fois. Bitcoin n'a jamais été aussi fort. Les USA, le Salvador, la Suisse l'adoptent. Tu ne peux pas arrêter un protocole décentralisé — c'est comme essayer d'interdire Internet en 1995.",
    emoji: "🏛️",
  },
  {
    attack: "\"C'est une bulle spéculative / un Ponzi\"",
    counter:
      "Un Ponzi nécessite un opérateur central qui recrute. Bitcoin n'a pas de CEO. Il est open-source, vérifiable par tous. Chaque \"bulle\" a crashé plus haut que le sommet de la précédente. Si c'est une bulle, c'est la seule bulle de l'histoire qui regonfle toujours plus fort.",
    emoji: "🫧",
  },
  {
    attack: "\"L'or c'est mieux, c'est tangible\"",
    counter:
      "Comme CZ l'a démontré face à un gold maxi : \"Ton lingot, il est vrai ?\" Tu ne peux pas vérifier la pureté d'un lingot sans le fondre. Bitcoin est vérifiable en une seconde par n'importe qui. Essaie d'envoyer un lingot d'or à l'autre bout du monde en 10 minutes…",
    emoji: "🥇",
  },
  {
    attack: "\"Il y a des milliers de cryptos, pourquoi Bitcoin ?\"",
    counter:
      "Il n'y a qu'un seul Bitcoin. Les altcoins ont des fondateurs, des prémines, des VC derrière. Bitcoin est le seul qui a eu une naissance immaculée — sans prévente, sans CEO, avec un créateur disparu. C'est la séparation de la monnaie et de l'État.",
    emoji: "👑",
  },
  {
    attack: "\"C'est trop compliqué / trop technique\"",
    counter:
      "Tu comprends comment fonctionne le protocole TCP/IP ? Non. Pourtant tu utilises Internet tous les jours. Tu n'as pas besoin de comprendre la cryptographie pour utiliser Bitcoin. Il y a des apps aussi simples que Venmo.",
    emoji: "📱",
  },
  {
    attack: "\"C'est trop tard pour acheter\"",
    counter:
      "On disait ça à 100$, à 1 000$, à 10 000$, à 50 000$. Seuls 2% de la population mondiale possède du BTC. Les ETFs viennent d'être approuvés. Les États commencent à constituer des réserves. Tu n'es pas en retard — tu es encore tôt.",
    emoji: "🕐",
  },
];

const ArgumentCard = ({
  attack,
  counter,
  emoji,
}: {
  attack: string;
  counter: string;
  emoji: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`rounded-xl border transition-all duration-300 cursor-pointer ${
        open
          ? "border-btc-orange/50 bg-card glow-btc-sm"
          : "border-border bg-card/50 hover:border-btc-orange/20"
      }`}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center gap-4 p-6">
        <span className="text-3xl flex-shrink-0">{emoji}</span>
        <p className="text-foreground font-semibold flex-1 text-lg">{attack}</p>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>
      {open && (
        <div className="px-6 pb-6 pt-0">
          <div className="h-px bg-gradient-btc opacity-30 mb-5" />
          <p className="text-secondary-foreground leading-relaxed text-base">
            {counter}
          </p>
        </div>
      )}
    </div>
  );
};

const ArgumentsSection = () => {
  return (
    <section id="arguments" className="py-24 bg-btc-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="font-mono text-sm tracking-[0.3em] uppercase text-btc-orange mb-4">
            Le guide anti-oncle
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="text-gradient-btc">10 arguments</span> pour le
            prochain repas de famille
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Clique sur chaque attaque pour découvrir la réponse qui fera taire
            ton oncle, ton banquier, et le journaliste de BFM.
          </p>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {arguments_list.map((arg, i) => (
            <ArgumentCard key={i} {...arg} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArgumentsSection;
