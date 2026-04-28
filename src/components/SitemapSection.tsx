import { Link } from "react-router-dom";
import {
  BookA,
  BookOpen,
  FileText,
  Hexagon,
  Home,
  Info,
  LineChart,
  Link as LinkIcon,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";

interface SitemapLink {
  to: string;
  label: string;
  icon: typeof Home;
  anchor?: boolean;
}

interface SitemapGroup {
  title: string;
  links: SitemapLink[];
}

const groups: SitemapGroup[] = [
  {
    title: "Accueil",
    links: [
      { to: "/", label: "Page d'accueil", icon: Home },
      { to: "#prix", label: "Cours du Bitcoin", icon: LineChart, anchor: true },
      { to: "#ressources", label: "Ressources & Liens", icon: LinkIcon, anchor: true },
      { to: "#apropos", label: "À propos & Contact", icon: Info, anchor: true },
    ],
  },
  {
    title: "Comprendre",
    links: [
      { to: "/fondamentaux", label: "Fondamentaux", icon: BookOpen },
      { to: "/arguments", label: "Arguments", icon: MessageSquare },
    ],
  },
  {
    title: "Passer à l'action",
    links: [
      { to: "/securiser", label: "Sécuriser ses bitcoins", icon: ShieldCheck },
    ],
  },
  {
    title: "Geek Area",
    links: [
      { to: "/geek-area", label: "Geek Area", icon: Sparkles },
      { to: "/geek-area/noeud-bitcoin", label: "Nœud Bitcoin", icon: Hexagon },
      { to: "/geek-area/hardware-wallet", label: "Hardware Wallet", icon: Wallet },
      { to: "/geek-area/livre-blanc", label: "Livre blanc de Satoshi", icon: FileText },
      { to: "/geek-area/dictionnaire", label: "Dictionnaire Pandul", icon: BookA },
    ],
  },
];

const SitemapSection = () => {
  return (
    <section className="py-14 md:py-20 border-t border-border bg-btc-dark/40">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <p className="font-mono text-sm tracking-[0.3em] uppercase text-btc-orange mb-4">
            Navigation complète
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Plan du <span className="text-gradient-btc">site</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Toutes les pages et sections pour explorer Bitcoin à ton rythme.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group) => (
            <div
              key={group.title}
              className="rounded-xl border border-border bg-card/50 p-5"
            >
              <h3 className="text-xs font-mono uppercase tracking-wider text-btc-orange mb-4">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link) => {
                  const Icon = link.icon;
                  const className =
                    "group flex items-center gap-2 text-sm text-muted-foreground hover:text-btc-orange transition-colors";
                  const content = (
                    <>
                      <Icon className="w-4 h-4 flex-shrink-0 text-btc-orange/70 group-hover:text-btc-orange" />
                      <span className="leading-snug">{link.label}</span>
                    </>
                  );
                  return (
                    <li key={link.to + link.label}>
                      {link.anchor ? (
                        <a href={link.to} className={className}>
                          {content}
                        </a>
                      ) : (
                        <Link to={link.to} className={className}>
                          {content}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SitemapSection;
