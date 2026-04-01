import { useState } from "react";
import { ExternalLink, Youtube, Twitter, Newspaper, Plus, Trash2, Lock, Unlock } from "lucide-react";

type LinkType = "article" | "youtube" | "tweet";

interface LinkItem {
  id: string;
  type: LinkType;
  url: string;
  title: string;
  imageUrl: string;
  description: string;
}

const ADMIN_PASSWORD = "btcmaxi2024";

const typeConfig: Record<LinkType, { icon: typeof ExternalLink; label: string; color: string; badge: string }> = {
  article: { icon: Newspaper, label: "Article", color: "text-blue-400", badge: "bg-blue-500/20 text-blue-400" },
  youtube: { icon: Youtube, label: "YouTube", color: "text-red-400", badge: "bg-red-500/20 text-red-400" },
  tweet: { icon: Twitter, label: "Tweet", color: "text-sky-400", badge: "bg-sky-500/20 text-sky-400" },
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

  const [isAdmin, setIsAdmin] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState<LinkType>("article");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const saveLinks = (items: LinkItem[]) => {
    setLinks(items);
    localStorage.setItem("btc-links", JSON.stringify(items));
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowPasswordPrompt(false);
      setPasswordInput("");
    } else {
      setPasswordInput("");
    }
  };

  const addLink = () => {
    if (!newUrl.trim() || !newTitle.trim()) return;
    const item: LinkItem = {
      id: Date.now().toString(),
      type: newType,
      url: newUrl.trim(),
      title: newTitle.trim(),
      imageUrl: newImageUrl.trim(),
      description: newDescription.trim(),
    };
    saveLinks([item, ...links]);
    setNewUrl("");
    setNewTitle("");
    setNewImageUrl("");
    setNewDescription("");
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
            Articles, vidéos YouTube et tweets sélectionnés pour approfondir tes connaissances.
          </p>
        </div>

        {/* Admin toggle */}
        <div className="max-w-3xl mx-auto mb-8">
          {!isAdmin && !showPasswordPrompt && (
            <button
              onClick={() => setShowPasswordPrompt(true)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors ml-auto"
            >
              <Lock className="w-4 h-4" /> Admin
            </button>
          )}
          {showPasswordPrompt && !isAdmin && (
            <div className="flex items-center gap-3 justify-end">
              <input
                type="password"
                placeholder="Mot de passe"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()}
                className="px-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-sm w-48"
              />
              <button
                onClick={handlePasswordSubmit}
                className="px-4 py-2 rounded-lg bg-gradient-btc text-primary-foreground text-sm font-medium"
              >
                OK
              </button>
              <button
                onClick={() => { setShowPasswordPrompt(false); setPasswordInput(""); }}
                className="px-3 py-2 rounded-lg text-muted-foreground text-sm"
              >
                Annuler
              </button>
            </div>
          )}

          {isAdmin && !showForm && (
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-btc-orange">
                <Unlock className="w-4 h-4" /> Mode admin
              </span>
              <button
                onClick={() => setShowForm(true)}
                className="py-3 px-6 rounded-xl border-2 border-dashed border-border hover:border-btc-orange/40 transition-colors flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <Plus className="w-5 h-5" />
                Ajouter un lien
              </button>
            </div>
          )}

          {isAdmin && showForm && (
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
                placeholder="URL du lien"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="url"
                placeholder="URL de l'image d'aperçu"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <textarea
                placeholder="Résumé ou extrait de l'article (2-3 phrases)…"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
              <div className="flex gap-3">
                <button
                  onClick={addLink}
                  className="px-6 py-3 rounded-lg bg-gradient-btc text-primary-foreground font-semibold transition-all hover:scale-105"
                >
                  Publier
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

        {/* Links grid */}
        <div className="max-w-4xl mx-auto grid gap-6 sm:grid-cols-2">
          {links.length === 0 && (
            <p className="text-center text-muted-foreground py-8 col-span-full">
              Aucune ressource publiée pour l'instant.
            </p>
          )}
          {links.map((link) => {
            const cfg = typeConfig[link.type];
            const Icon = cfg.icon;

            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-border bg-card/60 hover:border-btc-orange/30 overflow-hidden transition-all hover:shadow-lg hover:shadow-btc-orange/5 flex flex-col"
              >
                {/* Image */}
                {link.imageUrl ? (
                  <div className="relative w-full aspect-video overflow-hidden bg-secondary">
                    <img
                      src={link.imageUrl}
                      alt={link.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${cfg.badge}`}>
                      {cfg.label}
                    </span>
                  </div>
                ) : (
                  <div className="relative w-full aspect-video bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                    <Icon className={`w-12 h-12 ${cfg.color} opacity-40`} />
                    <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${cfg.badge}`}>
                      {cfg.label}
                    </span>
                  </div>
                )}

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-foreground font-bold text-lg leading-snug group-hover:text-btc-orange transition-colors line-clamp-2 mb-2">
                    {link.title}
                  </h3>
                  {link.description && (
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">
                      {link.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
                    <span className="text-muted-foreground text-xs truncate max-w-[70%]">
                      {new URL(link.url).hostname.replace("www.", "")}
                    </span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-btc-orange transition-colors" />
                  </div>
                </div>

                {/* Admin delete */}
                {isAdmin && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeLink(link.id);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-lg bg-background/80 hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LinksSection;
