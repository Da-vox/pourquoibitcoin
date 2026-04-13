import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ShareButtons from "@/components/ShareButtons";
import { Server, Cpu, BookOpen, CheckCircle, ArrowRight } from "lucide-react";

const sections = [
  {
    num: "01",
    icon: Server,
    title: "Monter son nœud Bitcoin",
    description:
      "Un nœud complet est la forme ultime de souveraineté sur le réseau Bitcoin. En faisant tourner Bitcoin Core sur ta propre machine, tu valides toi-même chaque transaction sans dépendre d'aucun tiers. Tu renforces aussi la décentralisation du réseau et protèges la confidentialité de tes adresses.",
    highlights: [
      "Installation pas à pas de Bitcoin Core (9 étapes)",
      "Configuration matérielle requise détaillée",
      "Connexion de ton wallet via RPC local",
    ],
    href: "/geek-area/noeud-bitcoin",
    label: "Monter un nœud",
  },
  {
    num: "02",
    icon: Cpu,
    title: "Construire son Hardware Wallet DIY",
    description:
      "SeedSigner est un hardware wallet open source que tu assembles toi-même pour moins de 50 €. Aucun firmware propriétaire, aucune connexion réseau, un code 100 % auditable par la communauté. Tu signes tes transactions via QR codes dans un air-gap total — la sécurité maximale.",
    highlights: [
      "Liste complète des composants (~50 €)",
      "Assemblage et flashage de l'image SeedSigner",
      "Workflow de signature via QR codes",
    ],
    href: "/geek-area/hardware-wallet",
    label: "Construire le wallet",
  },
  {
    num: "03",
    icon: BookOpen,
    title: "Livre Blanc de Satoshi",
    description:
      "Le 31 octobre 2008, Satoshi Nakamoto publie 9 pages qui allaient révolutionner la finance mondiale. « Bitcoin: A Peer-to-Peer Electronic Cash System » pose les bases d'un système de paiement sans tiers de confiance. Plonge dans l'œuvre originale, expliquée simplement en français.",
    highlights: [
      "12 chapitres résumés et vulgarisés",
      "Concepts techniques expliqués clairement",
      "Le point clé de chaque chapitre mis en avant",
    ],
    href: "/geek-area/livre-blanc",
    label: "Lire le résumé",
  },
];

const GeekArea = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        {/* ── Hero ── */}
        <section className="py-14 md:py-24">
          <div className="container mx-auto px-6 text-center">
            <p className="font-mono text-sm tracking-[0.3em] uppercase text-btc-orange mb-4">
              Pour les bitcoiners techniques
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              <span className="text-gradient-btc">Geek Area</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-10">
              Prends le contrôle total. Lance ton propre nœud Bitcoin, construis
              ton hardware wallet open source, et plonge dans l'œuvre originale
              de Satoshi — étape par étape.
            </p>
            {/* Ancres rapides */}
            <div className="flex flex-wrap gap-3 justify-center">
              {sections.map((s) => (
                <Link
                  key={s.num}
                  to={s.href}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-btc-orange/40 text-btc-orange text-sm font-medium transition-all hover:bg-btc-orange/10 hover:border-btc-orange"
                >
                  <s.icon className="w-3.5 h-3.5" />
                  {s.title}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══ Section Cards ══ */}
        <section className="py-14 md:py-20 border-t border-border">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto space-y-8">
              {sections.map((section) => (
                <div
                  key={section.num}
                  className="rounded-2xl border border-border bg-card/50 p-8 hover:border-btc-orange/30 transition-colors"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Icône + numéro */}
                    <div className="flex-shrink-0 flex flex-col items-center md:items-start gap-3">
                      <div className="w-14 h-14 rounded-xl bg-gradient-btc flex items-center justify-center">
                        <section.icon className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <span className="font-mono text-xs tracking-[0.3em] uppercase text-btc-orange">
                        Section {section.num}
                      </span>
                    </div>

                    {/* Contenu */}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                        {section.title}
                      </h2>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                        {section.description}
                      </p>

                      {/* Highlights */}
                      <ul className="space-y-2 mb-6">
                        {section.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-btc-orange flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground text-sm">{h}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Bouton */}
                      <Link
                        to={section.href}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-btc text-primary-foreground font-semibold text-sm transition-all hover:scale-105 shadow-btc"
                      >
                        {section.label}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Partage ── */}
        <section className="py-12 border-t border-border">
          <div className="container mx-auto px-6 text-center">
            <p className="text-muted-foreground text-sm mb-4">
              Partage la Geek Area avec d'autres bitcoiners
            </p>
            <ShareButtons title="Geek Area — Nœud Bitcoin, Hardware Wallet DIY et Livre Blanc de Satoshi" />
          </div>
        </section>
      </div>
      <FooterSection />
    </main>
  );
};

export default GeekArea;
