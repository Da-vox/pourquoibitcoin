import React from "react";
import { ExternalLink, Newspaper, Youtube, Twitter } from "lucide-react";

type LinkType = "article" | "youtube" | "tweet";

interface LinkItem {
  id: string;
  type: LinkType;
  url: string;
  title: string;
  description: string;
  image: string;
  date: string;
}

const LINKS: LinkItem[] = ([
  {
    id: "9",
    type: "youtube",
    url: "https://youtu.be/dIRwGcuOR1s?is=O8engs4DLlBhDN_Y",
    title: "Bitcoin : La révolution monétaire expliquée",
    description:
      "Une vidéo pédagogique qui explique en profondeur comment Bitcoin fonctionne techniquement et pourquoi il représente une révolution monétaire.",
    image: "https://img.youtube.com/vi/dIRwGcuOR1s/maxresdefault.jpg",
    date: "2024-06-01",
  },
  {
    id: "8",
    type: "article",
    url: "https://cryptoast.fr/pourquoi-21-millions-de-bitcoins/",
    title: "Pourquoi seulement 21 millions de bitcoins ?",
    description:
      "Cryptoast décrypte la raison derrière la limite des 21 millions de BTC, un choix fondamental de Satoshi Nakamoto qui garantit la rareté absolue de Bitcoin.",
    image: "https://cryptoast.fr/wp-content/uploads/2023/01/pourquoi-21-millions-bitcoin.jpg",
    date: "2023-01-15",
  },
  {
    id: "7",
    type: "article",
    url: "https://www.reddit.com/r/Bitcoin/comments/1n6ogzs/you_dont_need_more_crypto_news_you_need_021/",
    title: "You don't need more crypto news — you need 0.21 BTC",
    description:
      "Un post Reddit viral qui explique pourquoi accumuler 0.21 BTC (soit un millionième de l'offre totale) est plus important que suivre les news crypto au quotidien.",
    image: "https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png",
    date: "2025-04-01",
  },
  {
    id: "6",
    type: "youtube",
    url: "https://youtu.be/O1muDph8Tg8?is=Wzpz5Ml_t3BRsT01",
    title: "Bitcoin pour les nuls — tout comprendre en 30 min",
    description:
      "Une explication complète de Bitcoin en 30 minutes : histoire, technologie, enjeux économiques et pourquoi ça change tout.",
    image: "https://img.youtube.com/vi/O1muDph8Tg8/maxresdefault.jpg",
    date: "2024-03-15",
  },
  {
    id: "5",
    type: "youtube",
    url: "https://youtu.be/97QYykgZlA4?is=rkFWpvjKDyKOtuur",
    title: "Comprendre Bitcoin en quelques minutes",
    description:
      "Une vidéo claire et accessible pour comprendre les bases de Bitcoin, son fonctionnement et pourquoi il change la donne.",
    image: "https://img.youtube.com/vi/97QYykgZlA4/maxresdefault.jpg",
    date: "2024-01-01",
  },
  {
    id: "4",
    type: "article",
    url: "https://news.bitcoin.com/fr/btq-lance-un-reseau-de-test-bitcoin-resistant-a-linformatique-quantique-grace-au-bip-360/",
    title: "BTQ lance un réseau de test Bitcoin résistant à l'informatique quantique grâce au BIP 360",
    description:
      "BTQ Technologies a lancé la première implémentation fonctionnelle du BIP 360 sur son réseau de test Bitcoin Quantum. Cette mise à jour permet aux développeurs de tester des transactions Bitcoin résistantes à l'informatique quantique dans un environnement réel.",
    image:
      "https://static.news.bitcoin.com/wp-content/uploads/2026/03/btq-launches-quantum-resistant-bitcoin-testnet-with-bip-360.jpg",
    date: "2026-03-21",
  },
  {
    id: "3",
    type: "article",
    url: "https://www.cointribune.com/en/bitcoin-an-old-line-of-code-from-satoshi-ready-to-change-the-game/",
    title: "Bitcoin : une ancienne ligne de code de Satoshi prête à changer la donne",
    description:
      "L'opcode OP_CAT, aussi connu sous le nom de BIP-420, pourrait transformer le fonctionnement de la blockchain Bitcoin. Cette ligne de code faisait partie du protocole original mais a été retirée par Satoshi en 2010. Aujourd'hui, des développeurs veulent la réintroduire pour permettre des smart contracts sur Bitcoin.",
    image:
      "https://www.cointribune.com/app/uploads/2024/09/Bitcoin-OP_CAT.png",
    date: "2024-09-01",
  },
  {
    id: "2",
    type: "article",
    url: "https://journalducoin.com/bitcoin/bitcoin-michael-saylor-predit-btc-13-millions-dollars-21-ans/",
    title: "Michael Saylor prédit un BTC à 13 millions de dollars dans 21 ans",
    description:
      "Alors que le Bitcoin peine à franchir les 60 000 $, le très maximaliste Michael Saylor réitère ses perspectives au micro de CNBC : un BTC à 13 millions de dollars dans 21 ans. Sa stratégie de trésorerie Bitcoin chez MicroStrategy a déjà battu toutes les entreprises du S&P.",
    image:
      "https://journalducoin-com.exactdn.com/app/uploads/2023/05/Microstrategy_2.jpg?strip=all&lossy=1&quality=90&webp=90&ssl=1",
    date: "2024-09-10",
  },
  {
    id: "1",
    type: "article",
    url: "https://bitcoin.fr/lettre-ouverte-a-ma-famille/",
    title: "Lettre ouverte à ma famille",
    description:
      "Après plusieurs années et dîners à parler de bitcoin, l'auteur écrit un long message à sa famille au sujet de l'inflation, de leurs économies et de bitcoin. Un texte parfait à partager pour expliquer Bitcoin simplement à vos proches.",
    image:
      "https://bitcoin.fr/wp-content/uploads/2021/10/Lettre-ouverte-a-ma-famille-696x365.jpg",
    date: "2021-10-15",
  },
] as const satisfies readonly LinkItem[]).slice().sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

const typeLabel: Record<LinkType, { icon: typeof Newspaper; label: string }> = {
  article: { icon: Newspaper, label: "Article" },
  youtube: { icon: Youtube, label: "YouTube" },
  tweet: { icon: Twitter, label: "Tweet" },
};

const LinksSection = () => {
  return (
    <section className="py-24 bg-btc-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-mono text-sm tracking-[0.3em] uppercase text-btc-orange mb-4">
            Veille Bitcoin
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ressources & <span className="text-gradient-btc">Liens</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Articles, vidéos et tweets sélectionnés pour approfondir tes connaissances.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid gap-4 md:grid-cols-2">
          {LINKS.map((link, index) => {
            const cfg = typeLabel[link.type];
            const Icon = cfg.icon;
            return (
              <React.Fragment key={link.id}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-border bg-card/50 hover:border-btc-orange/30 overflow-hidden transition-all hover:shadow-lg hover:shadow-btc-orange/5 flex flex-col"
                >
                  <div className="aspect-[16/9] w-full overflow-hidden">
                    <img
                      src={link.image}
                      alt={link.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 space-y-1.5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-btc-orange">
                      <Icon className="w-3 h-3" />
                      <span>{cfg.label}</span>
                      <span className="text-muted-foreground ml-auto text-[10px]">
                        {new Date(link.date).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-foreground group-hover:text-btc-orange transition-colors leading-snug">
                      {link.title}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 flex-1">
                      {link.description}
                    </p>
                    <div className="flex items-center gap-1 text-btc-orange text-xs font-medium pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {link.type === "youtube" ? "Voir la vidéo" : "Lire l'article"} <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>
                </a>
                {index === 0 && LINKS.length > 1 && (
                  <div className="rounded-xl border border-border bg-card/30 p-6 text-center">
                    <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Publicité</p>
                    <div
                      className="min-h-[250px] flex items-center justify-center rounded-lg bg-muted/30 border border-dashed border-border"
                      id="adsense-slot"
                    >
                      {/* Remplacer par le script AdSense une fois l'ID obtenu */}
                      <p className="text-muted-foreground text-sm">Emplacement publicitaire AdSense</p>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LinksSection;
