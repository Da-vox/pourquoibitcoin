import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ShareButtons from "@/components/ShareButtons";
import Seo, { buildBreadcrumb, SITE_URL } from "@/components/Seo";
import {
  Server,
  Shield,
  HardDrive,
  Wifi,
  Terminal,
  Lock,
  Eye,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  ArrowLeft,
  Cpu,
  BookOpen,
  BookA,
  Pickaxe,
} from "lucide-react";

const noeudJsonLd = [
  buildBreadcrumb([
    { name: "Accueil", path: "/" },
    { name: "Geek Area", path: "/geek-area" },
    { name: "Nœud Bitcoin", path: "/geek-area/noeud-bitcoin" },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/geek-area/noeud-bitcoin#article`,
    headline: "Monter son nœud Bitcoin Core : guide complet",
    description:
      "Installation pas à pas de Bitcoin Core, configuration matérielle et connexion de son wallet via RPC.",
    inLanguage: "fr-FR",
    datePublished: "2025-01-01",
    dateModified: "2026-04-27",
    author: { "@type": "Organization", name: "Pourquoi Bitcoin", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Pourquoi Bitcoin",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg` },
    },
    image: `${SITE_URL}/og-image.jpg`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/geek-area/noeud-bitcoin`,
    },
    proficiencyLevel: "Expert",
    dependencies: "Bitcoin Core, Ubuntu Server, SSD 1 To",
    about: "Bitcoin Core full node",
    keywords: [
      "nœud bitcoin",
      "bitcoin core",
      "full node",
      "RPC",
      "raspberry pi bitcoin",
    ],
  },
];

const nodeArguments = [
  {
    icon: Eye,
    title: "Vérifier toi-même",
    description:
      "Un nœud complet valide chaque transaction et chaque bloc. Tu n'as plus besoin de faire confiance à un tiers - tu vérifies toi-même les règles du protocole Bitcoin.",
  },
  {
    icon: Shield,
    title: "Souveraineté totale",
    description:
      "Ton nœud ne dépend d'aucun serveur externe. Même si tous les exchanges ferment, ton nœud continue de valider tes transactions directement sur la blockchain.",
  },
  {
    icon: Wifi,
    title: "Renforcer le réseau",
    description:
      "Chaque nœud supplémentaire rend le réseau Bitcoin plus robuste et plus décentralisé. Tu participes activement à la résistance à la censure.",
  },
  {
    icon: Lock,
    title: "Confidentialité accrue",
    description:
      "En connectant ton wallet à ton propre nœud, tu n'exposes plus tes adresses Bitcoin à des serveurs tiers qui pourraient profiler tes transactions.",
  },
];

const nodeHardware = [
  { label: "Processeur", value: "x86_64 ou ARM (Raspberry Pi 4/5)" },
  { label: "RAM", value: "4 Go minimum, 8 Go recommandé" },
  { label: "Stockage", value: "SSD de 1 To minimum (la blockchain pèse ~600 Go)" },
  { label: "Connexion", value: "Internet filaire (Ethernet) fortement conseillé" },
  { label: "Système", value: "Ubuntu 22.04 LTS ou Debian 12" },
];

const nodeSteps = [
  {
    title: "Installer Ubuntu Server",
    content:
      "Télécharge Ubuntu 22.04 LTS Server depuis ubuntu.com. Crée une clé USB bootable avec Balena Etcher, puis installe le système sur ton SSD. Choisis une installation minimale sans interface graphique pour économiser les ressources.",
  },
  {
    title: "Mettre à jour le système",
    content:
      "Connecte-toi en SSH ou directement sur la machine et exécute les mises à jour système pour partir sur une base saine et sécurisée.",
    code: "sudo apt update && sudo apt upgrade -y",
  },
  {
    title: "Télécharger Bitcoin Core",
    content:
      "Rends-toi sur bitcoincore.org et récupère la dernière version stable. Vérifie toujours la signature cryptographique du binaire avant de l'installer - c'est une étape de sécurité non négociable.",
    code: "wget https://bitcoincore.org/bin/bitcoin-core-27.0/bitcoin-27.0-x86_64-linux-gnu.tar.gz",
  },
  {
    title: "Vérifier la signature GPG",
    content:
      "Importe les clés des développeurs Bitcoin Core et vérifie l'intégrité de l'archive téléchargée. Ne saute jamais cette étape.",
    code: "sha256sum -c SHA256SUMS.asc",
  },
  {
    title: "Installer Bitcoin Core",
    content:
      "Décompresse l'archive et copie les binaires dans un répertoire système accessible globalement.",
    code: "tar -xzf bitcoin-27.0-x86_64-linux-gnu.tar.gz\nsudo install -m 0755 -o root -g root -t /usr/local/bin bitcoin-27.0/bin/*",
  },
  {
    title: "Configurer bitcoin.conf",
    content:
      "Crée le répertoire de données et le fichier de configuration. Ces paramètres activent le mode daemon, limitent l'utilisation mémoire et activent le filtrage des blocs pour les wallets légers.",
    code: "mkdir -p ~/.bitcoin\ncat > ~/.bitcoin/bitcoin.conf << EOF\ndaemon=1\nserver=1\ntxindex=1\ndbcache=512\nmaxmempool=300\nEOF",
  },
  {
    title: "Créer un service systemd",
    content:
      "Configure Bitcoin Core pour démarrer automatiquement au boot, comme un vrai service système. Crée le fichier /etc/systemd/system/bitcoind.service avec les paramètres appropriés, puis active-le.",
    code: "sudo systemctl enable bitcoind\nsudo systemctl start bitcoind",
  },
  {
    title: "Synchroniser la blockchain",
    content:
      "Lance la synchronisation initiale (IBD - Initial Block Download). Cela peut prendre entre 12 et 48 heures selon ton matériel et ta connexion. Tu peux suivre l'avancement en temps réel.",
    code: "bitcoin-cli getblockchaininfo",
  },
  {
    title: "Connecter ton wallet",
    content:
      "Une fois synchronisé, connecte ton wallet (Sparrow Wallet par exemple) à ton nœud via l'adresse IP locale et le port RPC 8332. Tu es désormais ton propre serveur Bitcoin.",
  },
];

const nodeWarnings = [
  "Ne pas utiliser un disque dur HDD - un SSD est obligatoire pour les performances",
  "Laisser la machine allumée en permanence pour rester synchronisé",
  "Ouvrir le port 8333 sur ton routeur pour contribuer au réseau (optionnel mais recommandé)",
  "Ne jamais exposer ton port RPC (8332) sur internet sans authentification",
];

const otherSections = [
  {
    icon: Cpu,
    title: "Hardware Wallet DIY",
    description: "Construis ton propre portefeuille matériel open source avec SeedSigner pour moins de 50 €.",
    href: "/geek-area/hardware-wallet",
  },
  {
    icon: BookOpen,
    title: "Livre Blanc de Satoshi",
    description: "Le document fondateur de Bitcoin expliqué simplement, chapitre par chapitre.",
    href: "/geek-area/livre-blanc",
  },
  {
    icon: BookA,
    title: "Dictionnaire Pandul",
    description: "Le meilleur lexique Bitcoin open source en français, maintenu par la communauté.",
    href: "/geek-area/dictionnaire",
  },
];

const GeekAreaNoeud = () => {
  return (
    <main className="min-h-screen bg-background">
      <Seo
        title="Monter son nœud Bitcoin : guide Bitcoin Core pas à pas"
        description="Guide complet pour installer et configurer un nœud Bitcoin Core : matériel requis, installation en 9 étapes, connexion de ton wallet via RPC local et souveraineté totale sur le réseau."
        path="/geek-area/noeud-bitcoin"
        keywords="nœud bitcoin, bitcoin core, full node, RPC, souveraineté bitcoin, umbrel, raspberry pi, IBD, ubuntu bitcoin"
        type="article"
        articleSection="Geek Area"
        publishedTime="2025-01-01T00:00:00+01:00"
        modifiedTime="2026-04-27T00:00:00+02:00"
        jsonLd={noeudJsonLd}
      />
      <Navbar />
      <div className="pt-20">
        {/* ── Breadcrumb ── */}
        <div className="border-b border-border">
          <div className="container mx-auto px-6 py-3">
            <Link
              to="/geek-area"
              className="inline-flex items-center gap-2 text-btc-orange text-sm font-medium hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à Geek Area
            </Link>
          </div>
        </div>

        {/* ── Hero ── */}
        <section className="py-14 md:py-24">
          <div className="container mx-auto px-6 text-center">
            <div className="w-14 h-14 rounded-xl bg-gradient-btc flex items-center justify-center mx-auto mb-6">
              <Server className="w-7 h-7 text-primary-foreground" />
            </div>
            <p className="font-mono text-sm tracking-[0.3em] uppercase text-btc-orange mb-4">
              Section 01 - Geek Area
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Monter son{" "}
              <span className="text-gradient-btc">nœud Bitcoin</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Un nœud complet est la forme ultime de souveraineté sur le réseau
              Bitcoin. Voici pourquoi tu en as besoin, et comment l'installer
              sur n'importe quel PC.
            </p>
          </div>
        </section>

        {/* ══ Pourquoi un nœud ══ */}
        <section className="py-14 md:py-20 border-t border-border">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                Pourquoi faire tourner{" "}
                <span className="text-gradient-btc">son propre nœud ?</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {nodeArguments.map((arg, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-border bg-card/50 p-6 hover:border-btc-orange/30 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-gradient-btc flex items-center justify-center flex-shrink-0">
                        <arg.icon className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <h3 className="font-bold text-foreground">{arg.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {arg.description}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground mt-6">
                Pour aller plus loin :{" "}
                <a
                  href="https://www.bitstack-app.com/comprendre-bitcoin/6-raisons-de-configurer-votre-propre-noeud-bitcoin?c=EUR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-btc-orange hover:underline"
                >
                  6 raisons de configurer votre propre nœud Bitcoin (Bitstack)
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>

            {/* Nœud ≠ minage */}
            <div className="max-w-3xl mx-auto mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                Un nœud n'est{" "}
                <span className="text-gradient-btc">pas un ASIC</span> de minage
              </h2>
              <div className="rounded-xl border border-btc-orange/30 bg-card/50 p-6 md:p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-btc flex items-center justify-center">
                    <Pickaxe className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
                      C'est la confusion la plus fréquente chez les débutants :
                      faire tourner un nœud Bitcoin ne génère{" "}
                      <strong className="text-foreground">aucun bitcoin</strong>.
                      Un nœud et un ASIC (ou rig de minage) sont deux machines
                      radicalement différentes, avec deux rôles distincts dans le
                      réseau.
                    </p>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
                      Un{" "}
                      <strong className="text-foreground">nœud complet</strong>{" "}
                      est un validateur : il télécharge la blockchain, vérifie
                      chaque transaction et chaque bloc selon les règles du
                      protocole, puis relaie ces informations au reste du réseau.
                      Il tourne sur du matériel grand public (un Raspberry Pi, un
                      vieux PC, un mini-PC), consomme une dizaine de watts et ne
                      reçoit aucune récompense. Sa valeur est politique et
                      technique : la souveraineté, la vie privée et la
                      décentralisation.
                    </p>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
                      Un{" "}
                      <strong className="text-foreground">ASIC de minage</strong>{" "}
                      (Application-Specific Integrated Circuit) est une machine
                      spécialisée qui ne fait qu'une seule chose : calculer des
                      hashes SHA-256 à une vitesse vertigineuse pour tenter de
                      résoudre le puzzle cryptographique d'un bloc. Quand un
                      mineur trouve la bonne solution, il gagne la récompense de
                      bloc (actuellement 3,125 BTC) plus les frais de
                      transaction. Un ASIC moderne consomme entre 3000 et 5000
                      watts, fait autant de bruit qu'un aspirateur et ne sert à
                      rien d'autre qu'à miner.
                    </p>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      En résumé :{" "}
                      <strong className="text-foreground">
                        les mineurs produisent les blocs, les nœuds les
                        valident
                      </strong>
                      . Vouloir miner chez soi avec un PC ou un Raspberry Pi n'a
                      aucun sens économique depuis 2013 — la concurrence
                      industrielle des ASICs rend ça totalement non rentable.
                      Faire tourner un nœud, en revanche, reste accessible à
                      tout le monde, et c'est ce qui garantit que Bitcoin reste
                      décentralisé.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Matériel requis */}
            <div className="max-w-3xl mx-auto mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                <span className="text-gradient-btc">Matériel</span> requis
              </h2>
              <div className="rounded-xl border border-border bg-card/50 overflow-hidden">
                {nodeHardware.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-6 py-4 ${
                      i < nodeHardware.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <HardDrive className="w-4 h-4 text-btc-orange flex-shrink-0" />
                      <span className="font-medium text-foreground text-sm">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-muted-foreground text-sm text-right">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tutoriel pas à pas */}
            <div className="max-w-3xl mx-auto mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                Installation{" "}
                <span className="text-gradient-btc">étape par étape</span>
              </h2>
              <div className="space-y-5">
                {nodeSteps.map((step, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-border bg-card/50 p-6 hover:border-btc-orange/30 transition-colors"
                  >
                    <div className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-btc flex items-center justify-center text-primary-foreground font-bold text-sm">
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-foreground mb-2">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                          {step.content}
                        </p>
                        {step.code && (
                          <pre className="bg-btc-dark/80 border border-border rounded-lg px-4 py-3 text-btc-orange font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                            {step.code}
                          </pre>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Avertissements */}
            <div className="max-w-3xl mx-auto mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                Points d'attention{" "}
                <span className="text-gradient-btc">importants</span>
              </h2>
              <div className="space-y-3">
                {nodeWarnings.map((warning, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-lg border border-btc-orange/20 bg-btc-orange/5"
                  >
                    <AlertTriangle className="w-4 h-4 text-btc-orange flex-shrink-0 mt-0.5" />
                    <p className="text-secondary-foreground text-sm">{warning}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA nœud */}
            <div className="max-w-2xl mx-auto text-center rounded-xl border border-btc-orange/30 bg-card p-10 glow-btc-sm">
              <CheckCircle className="w-10 h-10 text-btc-orange mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-3">
                Ressources officielles
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Télécharge Bitcoin Core depuis le site officiel et consulte la
                documentation complète sur Bitcoin Wiki.
              </p>
              <a
                href="https://bitcoincore.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-btc text-primary-foreground font-semibold text-sm transition-all hover:scale-105 glow-btc"
              >
                bitcoincore.org <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ── Autres sections ── */}
        <section className="py-14 border-t border-border">
          <div className="container mx-auto px-6">
            <h2 className="text-xl font-bold text-foreground text-center mb-8">
              Continuer dans la{" "}
              <span className="text-gradient-btc">Geek Area</span>
            </h2>
            <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {otherSections.map((section, i) => (
                <Link
                  key={i}
                  to={section.href}
                  className="rounded-xl border border-border bg-card/50 p-6 hover:border-btc-orange/30 transition-colors group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-btc flex items-center justify-center flex-shrink-0">
                      <section.icon className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <h3 className="font-bold text-foreground group-hover:text-btc-orange transition-colors">
                      {section.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {section.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Partage ── */}
        <section className="py-12 border-t border-border">
          <div className="container mx-auto px-6 text-center">
            <p className="text-muted-foreground text-sm mb-4">
              Partage ce tutoriel avec d'autres bitcoiners
            </p>
            <ShareButtons title="Monter son nœud Bitcoin - Geek Area" />
          </div>
        </section>
      </div>
      <FooterSection />
    </main>
  );
};

export default GeekAreaNoeud;
