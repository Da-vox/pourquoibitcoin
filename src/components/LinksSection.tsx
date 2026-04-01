import { useState } from "react";
import { ExternalLink, Youtube, Twitter, Newspaper, Plus, Trash2 } from "lucide-react";

type LinkType = "article" | "youtube" | "tweet";

interface LinkItem {
  id: string;
  type: LinkType;
  url: string;
  title: string;
}

const typeConfig: Record<LinkType, { icon: typeof ExternalLink; label: string; color: string }> = {
  article: { icon: Newspaper, label: "Article", color: "text-blue-400" },
  youtube: { icon: Youtube, label: "YouTube", color: "text-red-400" },
  tweet: { icon: Twitter, label: "Tweet", color: "text-sky-400" },
};

const getYoutubeThumbnail = (url: string) => {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]+)/
  );
  return match ? `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg` : null;
};

const LinksSection = () => {
  const [links, setLinks] = useState<LinkItem[]>(() => {
    try {
      const saved = localStorage.getItem("btc-links");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [showForm, setShowForm] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState<LinkType>("article");

  const saveLinks = (items: LinkItem[]) => {
    setLinks(items);
    localStorage.setItem("btc-links", JSON.stringify(items));
  };

  const addLink = () => {
    if (!newUrl.trim() || !newTitle.trim()) return;
    const item: LinkItem = {
      id: Date.now().toString(),
      type: newType,
      url: newUrl.trim(),
      title: newTitle.trim(),
    };
    saveLinks([item, ...links]);
    setNewUrl("");
    setNewTitle("");
    setShowForm(false);
  };

  const removeLink = (id: string) => {
    saveLinks(links.filter((l) => l.id !== id));
  };

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
            Articles, vidéos YouTube et tweets pour approfondir tes connaissances.
          </p>
        </div>

        {/* Add button */}
        <div className="max-w-3xl mx-auto mb-8">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="w-full py-4 rounded-xl border-2 border-dashed border-border hover:border-btc-orange/40 transition-colors flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <Plus className="w-5 h-5" />
              Ajouter un lien
            </button>
          ) : (
            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
              <div className="flex gap-2">
                {(Object.keys(typeConfig) as LinkType[]).map((t) => {
                  const cfg = typeConfig[t];
                  return (
                    <button
                      key={t}
                      onClick={() => setNewType(t)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        newType === t
                          ? "bg-gradient-btc text-primary-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {cfg.label}
                    </button>
                  );
                })}
              </div>
              <input
                type="text"
                placeholder="Titre"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="url"
                placeholder="URL"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <div className="flex gap-3">
                <button
                  onClick={addLink}
                  className="px-6 py-3 rounded-lg bg-gradient-btc text-primary-foreground font-semibold transition-all hover:scale-105"
                >
                  Ajouter
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 rounded-lg bg-secondary text-muted-foreground font-medium"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Links list */}
        <div className="max-w-3xl mx-auto grid gap-4">
          {links.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              Aucun lien pour l'instant. Ajoute tes meilleurs articles et vidéos BTC !
            </p>
          )}
          {links.map((link) => {
            const cfg = typeConfig[link.type];
            const Icon = cfg.icon;
            const ytThumb = link.type === "youtube" ? getYoutubeThumbnail(link.url) : null;

            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-border bg-card/50 hover:border-btc-orange/30 p-4 transition-all"
              >
                {ytThumb ? (
                  <img
                    src={ytThumb}
                    alt={link.title}
                    className="w-24 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <Icon className={`w-5 h-5 ${cfg.color}`} />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-foreground font-semibold truncate group-hover:text-btc-orange transition-colors">
                    {link.title}
                  </p>
                  <p className="text-muted-foreground text-sm truncate">
                    {link.url}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeLink(link.id);
                    }}
                    className="p-2 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LinksSection;
