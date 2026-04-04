import { ExternalLink, Newspaper } from "lucide-react";

interface LinkItem {
  id: string;
  type: "article" | "youtube" | "tweet";
  url: string;
  title: string;
  description: string;
  image: string;
  date: string; // YYYY-MM-DD for sorting
}

const LINKS: LinkItem[] = [
  {
    id: "2",
    type: "article" as const,
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
    type: "article" as const,
    type: "article",
    url: "https://bitcoin.fr/lettre-ouverte-a-ma-famille/",
    title: "Lettre ouverte à ma famille",
    description:
      "Après plusieurs années et dîners à parler de bitcoin, l'auteur écrit un long message à sa famille au sujet de l'inflation, de leurs économies et de bitcoin. Un texte parfait à partager pour expliquer Bitcoin simplement à vos proches.",
    image:
      "https://bitcoin.fr/wp-content/uploads/2021/10/Lettre-ouverte-a-ma-famille-696x365.jpg",
    date: "2021-10-15",
  },
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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

        <div className="max-w-3xl mx-auto grid gap-6">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-border bg-card/50 hover:border-btc-orange/30 overflow-hidden transition-all hover:shadow-lg hover:shadow-btc-orange/5"
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={link.image}
                  alt={link.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-btc-orange">
                  <Newspaper className="w-3.5 h-3.5" />
                  <span>Article</span>
                  <span className="text-muted-foreground ml-auto">
                    {new Date(link.date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground group-hover:text-btc-orange transition-colors leading-snug">
                  {link.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {link.description}
                </p>
                <div className="flex items-center gap-1 text-btc-orange text-sm font-medium pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Lire l'article <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LinksSection;
