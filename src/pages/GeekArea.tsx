import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ShareButtons from "@/components/ShareButtons";
import {
  Server,
  Shield,
  Cpu,
  HardDrive,
  Wifi,
  Terminal,
  Lock,
  Eye,
  Package,
  Zap,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";

/* ─────────────────────────────────────────────
   SECTION 1 — NOEUD BITCOIN
───────────────────────────────────────────── */

const nodeArguments = [
  {
    icon: Eye,
    title: "Vérifier toi-même",
    description:
      "Un nœud complet valide chaque transaction et chaque bloc. Tu n'as plus besoin de faire confiance à un tiers — tu vérifies toi-même les règles du protocole Bitcoin.",
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
      "Rends-toi sur bitcoincore.org et récupère la dernière version stable. Vérifie toujours la signature cryptographique du binaire avant de l'installer — c'est une étape de sécurité non négociable.",
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
      "Lance la synchronisation initiale (IBD — Initial Block Download). Cela peut prendre entre 12 et 48 heures selon ton matériel et ta connexion. Tu peux suivre l'avancement en temps réel.",
    code: "bitcoin-cli getblockchaininfo",
  },
  {
    title: "Connecter ton wallet",
    content:
      "Une fois synchronisé, connecte ton wallet (Sparrow Wallet par exemple) à ton nœud via l'adresse IP locale et le port RPC 8332. Tu es désormais ton propre serveur Bitcoin.",
  },
];

const nodeWarnings = [
  "Ne pas utiliser un disque dur HDD — un SSD est obligatoire pour les performances",
  "Laisser la machine allumée en permanence pour rester synchronisé",
  "Ouvrir le port 8333 sur ton routeur pour contribuer au réseau (optionnel mais recommandé)",
  "Ne jamais exposer ton port RPC (8332) sur internet sans authentification",
];

/* ─────────────────────────────────────────────
   SECTION 2 — DIY HARDWARE WALLET
───────────────────────────────────────────── */

const hwArguments = [
  {
    icon: Eye,
    title: "Code 100 % auditable",
    description:
      "Un hardware wallet open source comme SeedSigner a un code entièrement public, audité par la communauté. Aucune backdoor cachée, aucune mise à jour forcée opaque.",
  },
  {
    icon: Shield,
    title: "Zéro confiance aveugle",
    description:
      "Tu construis toi-même l'appareil. Tu sais exactement ce qu'il contient. Pas de composant secret, pas de firmware propriétaire, pas d'entreprise intermédiaire.",
  },
  {
    icon: Lock,
    title: "Air-gap total",
    description:
      "SeedSigner est conçu pour ne jamais se connecter à internet. Les transactions sont signées via QR codes. Aucune surface d'attaque réseau — c'est l'isolation maximale.",
  },
  {
    icon: Zap,
    title: "Coût minimal",
    description:
      "Le matériel coûte moins de 50 €. C'est bien moins qu'un Ledger ou Trezor, pour un niveau de sécurité équivalent voire supérieur grâce à la transparence totale du code.",
  },
];

const hwComponents = [
  { label: "Carte principale", value: "Raspberry Pi Zero 2 W (~18 €)" },
  { label: "Écran", value: "WaveShare 1.3\" LCD HAT 240×240 (~15 €)" },
  { label: "Caméra", value: "Raspberry Pi Camera Module V2 (~12 €)" },
  { label: "Boitier", value: "Boitier imprimé 3D (fichiers STL disponibles en open source)" },
  { label: "Carte microSD", value: "8 Go minimum (classe 10)" },
  { label: "Pile", value: "Batterie externe USB ou pile AAA avec adaptateur" },
];

const hwSteps = [
  {
    title: "Commander le matériel",
    content:
      "Commande les composants listés ci-dessus. Tu peux trouver le Raspberry Pi Zero 2 W sur des sites comme kubii.fr ou raspberrypi.com. La caméra et l'écran sont disponibles sur Amazon ou AliExpress. Évite les kits bundlés d'origine inconnue.",
  },
  {
    title: "Télécharger l'image SeedSigner",
    content:
      "Rends-toi sur github.com/SeedSigner/seedsigner et télécharge la dernière image officielle. Vérifie TOUJOURS la signature SHA256 du fichier téléchargé avant de continuer.",
    code: "sha256sum seedsigner_os.0.7.0.pi02w.img",
  },
  {
    title: "Flasher la microSD",
    content:
      "Utilise Balena Etcher (ou Raspberry Pi Imager) pour écrire l'image sur la carte microSD. L'opération prend 2 à 5 minutes. N'éjecte pas la carte avant que le logiciel confirme la fin.",
  },
  {
    title: "Assembler le matériel",
    content:
      "Emboîte l'écran LCD HAT directement sur les GPIO du Raspberry Pi Zero. Connecte le module caméra via le câble nappe. Insère la microSD. Si tu as imprimé un boîtier, referme l'ensemble. Aucune soudure n'est nécessaire.",
  },
  {
    title: "Premier démarrage",
    content:
      "Alimente le Raspberry Pi Zero via le port USB. SeedSigner démarre en quelques secondes. Aucun paramétrage réseau n'est requis — l'appareil fonctionne entièrement hors ligne dès le premier démarrage.",
  },
  {
    title: "Générer ta seed phrase",
    content:
      "Dans le menu principal, sélectionne « Create a Seed ». SeedSigner te propose trois méthodes : lancer de dés (méthode recommandée pour le maximum d'entropie), créer une image via la caméra, ou saisir manuellement. Note tes 12 ou 24 mots sur papier.",
    code: "→ Create a Seed → Dice rolls (99 lancers pour 256 bits d'entropie)",
  },
  {
    title: "Vérifier et sauvegarder",
    content:
      "SeedSigner te demandera de retaper ta seed pour confirmer que tu l'as correctement notée. Range ensuite la feuille papier dans un endroit sécurisé. Ne la numérise JAMAIS. Option avancée : graver les mots sur une plaque en acier inoxydable pour résister au feu et à l'eau.",
  },
  {
    title: "Connecter à Sparrow Wallet",
    content:
      "Sur ton ordinateur, installe Sparrow Wallet (sparrowwallet.com). Dans Sparrow, crée un nouveau wallet et sélectionne « Airgapped Hardware Wallet ». Sur SeedSigner, exporte ton xpub via QR code. Scanne-le avec Sparrow pour finaliser la connexion.",
  },
  {
    title: "Signer ta première transaction",
    content:
      "Pour signer une transaction, construis-la dans Sparrow, exporte-la en PSBT via QR code, scanne-la avec SeedSigner, vérifie les détails sur l'écran, confirme la signature, puis rescanne le QR résultant dans Sparrow pour diffuser la transaction.",
  },
];

const hwWarnings = [
  "Ne jamais connecter SeedSigner à internet ou à un ordinateur via USB pour un usage réel",
  "Toujours vérifier la signature SHA256 de l'image avant de flasher",
  "Télécharger SeedSigner uniquement depuis le dépôt GitHub officiel",
  "Générer ta seed avec des dés physiques pour une entropie maximale",
  "Ne jamais photographier ou stocker ta seed phrase en format numérique",
];

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */

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
              Prends le contrôle total. Lance ton propre nœud Bitcoin et
              construis ton hardware wallet open source — étape par étape.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#noeud-bitcoin"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-btc text-primary-foreground font-semibold text-sm transition-all hover:scale-105 shadow-btc"
              >
                <Server className="w-4 h-4" />
                Monter un nœud Bitcoin
              </a>
              <a
                href="#hardware-wallet"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-btc-orange/40 text-btc-orange font-semibold text-sm transition-all hover:bg-btc-orange/10 hover:border-btc-orange"
              >
                <Cpu className="w-4 h-4" />
                Construire son hardware wallet
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            SECTION 1 — NŒUD BITCOIN
        ══════════════════════════════════════ */}
        <section id="noeud-bitcoin" className="py-14 md:py-20 border-t border-border">
          <div className="container mx-auto px-6">
            {/* En-tête section */}
            <div className="max-w-3xl mx-auto text-center mb-14">
              <div className="w-14 h-14 rounded-xl bg-gradient-btc flex items-center justify-center mx-auto mb-6">
                <Server className="w-7 h-7 text-primary-foreground" />
              </div>
              <p className="font-mono text-xs tracking-[0.4em] uppercase text-btc-orange mb-4">
                Section 01
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-5">
                Monter son{" "}
                <span className="text-gradient-btc">nœud Bitcoin</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Un nœud complet est la forme ultime de souveraineté sur le
                réseau Bitcoin. Voici pourquoi tu en as besoin, et comment
                l'installer sur n'importe quel PC.
              </p>
            </div>

            {/* Pourquoi un nœud */}
            <div className="max-w-4xl mx-auto mb-16">
              <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
                Pourquoi faire tourner{" "}
                <span className="text-gradient-btc">son propre nœud ?</span>
              </h3>
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
                      <h4 className="font-bold text-foreground">{arg.title}</h4>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {arg.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Matériel requis */}
            <div className="max-w-3xl mx-auto mb-16">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                <span className="text-gradient-btc">Matériel</span> requis
              </h3>
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
              <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
                Installation{" "}
                <span className="text-gradient-btc">étape par étape</span>
              </h3>
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
                        <h4 className="font-bold text-foreground mb-2">
                          {step.title}
                        </h4>
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
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                Points d'attention{" "}
                <span className="text-gradient-btc">importants</span>
              </h3>
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
              <Terminal className="w-10 h-10 text-btc-orange mx-auto mb-4" />
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

        {/* ══════════════════════════════════════
            SECTION 2 — DIY HARDWARE WALLET
        ══════════════════════════════════════ */}
        <section id="hardware-wallet" className="py-14 md:py-20 border-t border-border">
          <div className="container mx-auto px-6">
            {/* En-tête section */}
            <div className="max-w-3xl mx-auto text-center mb-14">
              <div className="w-14 h-14 rounded-xl bg-gradient-btc flex items-center justify-center mx-auto mb-6">
                <Cpu className="w-7 h-7 text-primary-foreground" />
              </div>
              <p className="font-mono text-xs tracking-[0.4em] uppercase text-btc-orange mb-4">
                Section 02
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-5">
                Construire son{" "}
                <span className="text-gradient-btc">hardware wallet DIY</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                SeedSigner est un hardware wallet open source que tu assembles
                toi-même pour moins de 50 €. Zéro confiance aveugle, zéro
                connexion réseau, 100 % transparent.
              </p>
            </div>

            {/* Pourquoi un DIY hardware wallet */}
            <div className="max-w-4xl mx-auto mb-16">
              <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
                Pourquoi construire son{" "}
                <span className="text-gradient-btc">propre hardware wallet ?</span>
              </h3>
              <div className="grid sm:grid-cols-2 gap-5">
                {hwArguments.map((arg, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-border bg-card/50 p-6 hover:border-btc-orange/30 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-gradient-btc flex items-center justify-center flex-shrink-0">
                        <arg.icon className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <h4 className="font-bold text-foreground">{arg.title}</h4>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {arg.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Liste des composants */}
            <div className="max-w-3xl mx-auto mb-16">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                <span className="text-gradient-btc">Composants</span> nécessaires
              </h3>
              <div className="rounded-xl border border-border bg-card/50 overflow-hidden">
                {hwComponents.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-6 py-4 ${
                      i < hwComponents.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Package className="w-4 h-4 text-btc-orange flex-shrink-0" />
                      <span className="font-medium text-foreground text-sm">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-muted-foreground text-sm text-right max-w-[55%]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tutoriel pas à pas */}
            <div className="max-w-3xl mx-auto mb-16">
              <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
                Assemblage et configuration{" "}
                <span className="text-gradient-btc">étape par étape</span>
              </h3>
              <div className="space-y-5">
                {hwSteps.map((step, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-border bg-card/50 p-6 hover:border-btc-orange/30 transition-colors"
                  >
                    <div className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-btc flex items-center justify-center text-primary-foreground font-bold text-sm">
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-foreground mb-2">
                          {step.title}
                        </h4>
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
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                Règles de sécurité{" "}
                <span className="text-gradient-btc">absolues</span>
              </h3>
              <div className="space-y-3">
                {hwWarnings.map((warning, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-lg border border-destructive/30 bg-destructive/5"
                  >
                    <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                    <p className="text-secondary-foreground text-sm">{warning}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA hardware wallet */}
            <div className="max-w-2xl mx-auto text-center rounded-xl border border-btc-orange/30 bg-card p-10 glow-btc-sm">
              <CheckCircle className="w-10 h-10 text-btc-orange mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-3">
                Code source et documentation
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Le projet SeedSigner est entièrement open source. Retrouve le
                code, les fichiers STL pour l'impression 3D et la documentation
                complète sur GitHub.
              </p>
              <a
                href="https://github.com/SeedSigner/seedsigner"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-btc text-primary-foreground font-semibold text-sm transition-all hover:scale-105 glow-btc"
              >
                SeedSigner sur GitHub <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ── Partage ── */}
        <section className="py-12 border-t border-border">
          <div className="container mx-auto px-6 text-center">
            <p className="text-muted-foreground text-sm mb-4">
              Partage ces tutoriels avec d'autres bitcoiners
            </p>
            <ShareButtons title="Geek Area — Nœud Bitcoin et Hardware Wallet DIY" />
          </div>
        </section>
      </div>
      <FooterSection />
    </main>
  );
};

export default GeekArea;
