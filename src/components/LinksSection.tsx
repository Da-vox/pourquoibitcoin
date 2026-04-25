import { useRef, useState } from "react";
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
  "id": "18",
  "type": "tweet",
  "url": "https://x.com/BitcoinArchive/status/2047889104872833190?s=20",
  "title": "Tweet de Bitcoin Archive",
  "description": "Un tweet à découvrir sur Bitcoin par Bitcoin Archive.",
  "image": "https://pbs.twimg.com/profile_images/1396929547347546113/Y4HGbg-9_400x400.jpg",
  "date": "2026-04-25"
},



{
  "id": "17",
  "type": "tweet",
  "url": "https://x.com/BtcMaxi707/status/2047250751962161575?s=20",
  "title": "Tweet de BtcMaxi707",
  "description": "Un tweet à découvrir sur Bitcoin par BtcMaxi707.",
  "image": "https://pbs.twimg.com/media/HGlLtT8bwAA04kL?format=jpg&name=large",
  "date": "2026-04-24"
},



{
  "id": "16",
  "type": "tweet",
  "url": "https://x.com/AlexesNakamoto/status/2046700165822660758?s=20",
  "title": "Tweet d'Alexes Nakamoto",
  "description": "Un tweet à découvrir sur Bitcoin par Alexes Nakamoto.",
  "image": "https://pbs.twimg.com/media/HGdWxsGXEAAmfPI?format=jpg&name=large",
  "date": "2026-04-22"
},



{
  "id": "15",
  "type": "tweet",
  "url": "https://x.com/DocumentingBTC/status/2045108621999014251",
  "title": "Watch and learn about Bitcoin mining in 12 minutes",
  "description": "Une vidéo claire et pédagogique de 12 minutes qui explique simplement le fonctionnement du minage de Bitcoin : l’énergie, le hardware, la difficulté, les récompenses et pourquoi c’est essentiel à la sécurité du réseau.",
  "image": "https://pbs.twimg.com/profile_images/1369025687743500288/-4tdBSu5.jpg",
  "date": "2026-04-17"
},



{
  "id": "14",
  "type": "tweet",
  "url": "https://x.com/DocumentingBTC/status/2044797743931998672",
  "title": "Distribution Map of Computers Running Bitcoin Nodes",
  "description": "Carte de répartition mondiale des nœuds Bitcoin en fonctionnement. Une visualisation claire de la décentralisation du réseau : des milliers de nœuds répartis sur tous les continents, avec une forte concentration en Europe et en Amérique du Nord. Plus de 60 % des nœuds restent invisibles (Tor, etc.). Bitcoin reste extrêmement résilient et sans point de défaillance unique.",
  "image": "https://pbs.twimg.com/media/HGCUtaka4AEWAE_.jpg",
  "date": "2026-04-16"
},



{
  "id": "13",
  "type": "tweet",
  "url": "https://x.com/RichardDetente/status/2003012634560335921",
  "title": "Que penser de l’annonce de nombreux bitcoiners : Bitcoin va faire +30 % par an pendant 20 ans ? Fantasme ou réalité ?",
  "description": "Analyse équilibrée sur les projections haussières de Bitcoin à long terme. Les gains d’adoption sont réels mais ponctuels. Faut-il « repricer » tous les actifs en Bitcoin ? Attention au risque total : même avec une petite chance d’échec, est-on prêt à tout miser ? Il est sage de garder une partie de son épargne décorrélée.",
  "image": "https://pbs.twimg.com/profile_images/1905517046613315584/oeagiO2L.jpg",
  "date": "2025-12-22"
},


{
  "id": "12",
  "type": "youtube",
  "url": "https://youtu.be/ITtZXwFw7Oc",
  "title": "Posséder du Bitcoin c'est posséder le monde. Voici pourquoi.",
  "description": "Il y a un graphique qui fascine depuis des années : trois courbes sur 110 ans d’histoire reliant le dollar, l’or et le pétrole. Cette vidéo remonte aux fondements de la monnaie, explore le point de Schelling, le paradoxe des monnaies nationales et explique pourquoi Bitcoin représente bien plus qu’un actif : une recomposition structurelle de l’architecture monétaire mondiale.",
  "image": "https://i.ytimg.com/vi/ITtZXwFw7Oc/maxresdefault.jpg",
  "date": "2026-04-12"
},



{
  "id": "11",
  "type": "article",
  "url": "https://fr.tradingview.com/news/cointribune:fa1d68949b858:0/",
  "title": "L’Iran impose un péage en Bitcoin pour traverser le détroit d’Ormuz",
  "description": "En pleine escalade des tensions entre l’Iran et Israël, le détroit d’Ormuz devient le théâtre d’une révolution économique : un péage allant jusqu’à 2 millions de dollars en Bitcoin (ou en yuan chinois) pour traverser. Cette mesure illustre l’utilisation croissante des cryptomonnaies par les États sous sanctions pour contourner le système financier traditionnel.",
  "image": "https://s3.tradingview.com/news/image/cointribune:fa1d68949b858-cebc11f68cd09ef6143353b0625a2455-resized.webp",
  "date": "2026-04-09"
},


{
  "id": "10",
  "type": "youtube",
  "url": "https://youtu.be/Qib13mVh2So",
  "title": "L'Iran fait payer le pétrole mondial en Bitcoin ?! Un péage en BTC au cœur du détroit d’Ormuz",
  "description": "Entre tensions géopolitiques et blocage du système financier, un scénario qui pourrait redéfinir les règles du commerce international. Décryptage complet sur le rôle de Bitcoin dans le pétrole mondial et le détroit d’Ormuz.",
  "image": "https://i.ytimg.com/vi/Qib13mVh2So/maxresdefault.jpg",
  "date": "2026-04-10"
},
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
    title: "You don't need more crypto news - you need 0.21 BTC",
    description:
      "Un post Reddit viral qui explique pourquoi accumuler 0.21 BTC (soit un millionième de l'offre totale) est plus important que suivre les news crypto au quotidien.",
    image: "https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png",
    date: "2025-04-01",
  },
  {
    id: "6",
    type: "youtube",
    url: "https://youtu.be/O1muDph8Tg8?is=Wzpz5Ml_t3BRsT01",
    title: "Bitcoin pour les nuls - tout comprendre en 30 min",
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
      "https://www.cointribune.com/app/uploads/2024/09/Bitcoin-code.png",
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

type Filter = "all" | LinkType;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "Tout" },
  { value: "article", label: "Articles" },
  { value: "youtube", label: "Vidéos" },
  { value: "tweet", label: "Tweets" },
];

const PAGE_SIZE = 6;

const LinksSection = () => {
  const [filter, setFilter] = useState<Filter>("all");
  const [page, setPage] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);

  const filteredLinks = filter === "all" ? LINKS : LINKS.filter((l) => l.type === filter);
  const totalPages = Math.max(1, Math.ceil(filteredLinks.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visibleLinks = filteredLinks.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleFilterChange = (value: Filter) => {
    setFilter(value);
    setPage(1);
  };

  const goToPage = (p: number) => {
    const next = Math.min(Math.max(1, p), totalPages);
    if (next === currentPage) return;
    setPage(next);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section ref={sectionRef} className="py-14 md:py-24 bg-btc-dark scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-mono text-sm tracking-[0.3em] uppercase text-btc-orange mb-4">
            Actu 100% Bitcoin
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ressources & <span className="text-gradient-btc">Liens</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Articles, vidéos et tweets sélectionnés pour approfondir tes connaissances.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Filtrer par type"
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {FILTERS.map((f) => {
            const active = filter === f.value;
            const count = f.value === "all" ? LINKS.length : LINKS.filter((l) => l.type === f.value).length;
            return (
              <button
                key={f.value}
                role="tab"
                aria-selected={active}
                onClick={() => handleFilterChange(f.value)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-colors ${
                  active
                    ? "bg-btc-orange text-btc-dark border-btc-orange"
                    : "bg-card/50 text-muted-foreground border-border hover:border-btc-orange/30 hover:text-foreground"
                }`}
              >
                {f.label}
                <span className={`ml-2 text-[10px] ${active ? "opacity-70" : "opacity-60"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto grid gap-4 md:grid-cols-2">
          {visibleLinks.map((link) => {
            const cfg = typeLabel[link.type];
            const Icon = cfg.icon;
            return (
              <a
                key={link.id}
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
            );
          })}
        </div>

        {totalPages > 1 && (
          <nav
            aria-label="Pagination des liens"
            className="flex flex-wrap justify-center items-center gap-2 mt-10"
          >
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Page précédente"
              className="px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border bg-card/50 text-muted-foreground border-border hover:border-btc-orange/30 hover:text-foreground transition-colors disabled:opacity-40 disabled:pointer-events-none"
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
              const active = p === currentPage;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => goToPage(p)}
                  aria-current={active ? "page" : undefined}
                  aria-label={`Page ${p}`}
                  className={`min-w-9 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-colors ${
                    active
                      ? "bg-btc-orange text-btc-dark border-btc-orange"
                      : "bg-card/50 text-muted-foreground border-border hover:border-btc-orange/30 hover:text-foreground"
                  }`}
                >
                  {p}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Page suivante"
              className="px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border bg-card/50 text-muted-foreground border-border hover:border-btc-orange/30 hover:text-foreground transition-colors disabled:opacity-40 disabled:pointer-events-none"
            >
              ›
            </button>
          </nav>
        )}
      </div>
    </section>
  );
};

export default LinksSection;
