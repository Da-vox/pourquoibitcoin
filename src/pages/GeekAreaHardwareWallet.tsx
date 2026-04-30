import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ShareButtons from "@/components/ShareButtons";
import Seo, { buildBreadcrumb, SITE_URL } from "@/components/Seo";
import {
  Cpu,
  Shield,
  Lock,
  Eye,
  Package,
  Zap,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  ArrowLeft,
  Server,
  BookOpen,
  BookA,
} from "lucide-react";

const hwWalletJsonLd = [
  buildBreadcrumb([
    { name: "Accueil", path: "/" },
    { name: "Geek Area", path: "/geek-area" },
    { name: "Hardware Wallet DIY", path: "/geek-area/hardware-wallet" },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${SITE_URL}/geek-area/hardware-wallet#article`,
    headline: "Construire son hardware wallet DIY SeedSigner",
    description:
      "Assemblage d'un hardware wallet open source SeedSigner : composants, flashage et workflow de signature par QR codes en air-gap.",
    inLanguage: "fr-FR",
    datePublished: "2025-01-01",
    dateModified: "2026-04-30",
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
      "@id": `${SITE_URL}/geek-area/hardware-wallet`,
    },
    proficiencyLevel: "Expert",
    dependencies: "Raspberry Pi Zero 2W, écran Waveshare, caméra Pi",
    about: "SeedSigner DIY hardware wallet",
    keywords: [
      "seedsigner",
      "hardware wallet diy",
      "hardware wallet open source",
      "air-gap bitcoin",
      "qr code signing",
    ],
  },
];

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
      "SeedSigner est conçu pour ne jamais se connecter à internet. Les transactions sont signées via QR codes. Aucune surface d'attaque réseau - c'est l'isolation maximale.",
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
      "Alimente le Raspberry Pi Zero via le port USB. SeedSigner démarre en quelques secondes. Aucun paramétrage réseau n'est requis - l'appareil fonctionne entièrement hors ligne dès le premier démarrage.",
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

const otherSections = [
  {
    icon: Server,
    title: "Nœud Bitcoin",
    description: "Guide complet pour installer Bitcoin Core et valider toi-même les transactions.",
    href: "/geek-area/noeud-bitcoin",
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

const GeekAreaHardwareWallet = () => {
  return (
    <main className="min-h-screen bg-background">
      <Seo
        title="Hardware wallet DIY SeedSigner : guide de construction"
        description="Construis ton propre hardware wallet open source SeedSigner pour moins de 50 € : composants, flashage de l'image et workflow de signature air-gap par QR codes."
        path="/geek-area/hardware-wallet"
        keywords="seedsigner, hardware wallet diy, hardware wallet open source, air-gap bitcoin, qr code signing, raspberry pi zero, sparrow wallet"
        type="article"
        articleSection="Geek Area"
        publishedTime="2025-01-01T00:00:00+01:00"
        modifiedTime="2026-04-30T00:00:00+02:00"
        jsonLd={hwWalletJsonLd}
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
              <Cpu className="w-7 h-7 text-primary-foreground" />
            </div>
            <p className="font-mono text-sm tracking-[0.3em] uppercase text-btc-orange mb-4">
              Section 02 - Geek Area
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Construire son{" "}
              <span className="text-gradient-btc">hardware wallet DIY</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              SeedSigner est un hardware wallet open source que tu assembles
              toi-même pour moins de 50 €. Zéro confiance aveugle, zéro
              connexion réseau, 100 % transparent.
            </p>
          </div>
        </section>

        {/* ══ Contenu ══ */}
        <section className="py-14 md:py-20 border-t border-border">
          <div className="container mx-auto px-6">
            {/* Pourquoi un DIY hardware wallet */}
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                Pourquoi construire son{" "}
                <span className="text-gradient-btc">propre hardware wallet ?</span>
              </h2>
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
                      <h3 className="font-bold text-foreground">{arg.title}</h3>
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
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                <span className="text-gradient-btc">Composants</span> nécessaires
              </h2>
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
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                Assemblage et configuration{" "}
                <span className="text-gradient-btc">étape par étape</span>
              </h2>
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
                Règles de sécurité{" "}
                <span className="text-gradient-btc">absolues</span>
              </h2>
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
            <ShareButtons title="Construire son Hardware Wallet DIY - Geek Area" />
          </div>
        </section>
      </div>
      <FooterSection />
    </main>
  );
};

export default GeekAreaHardwareWallet;
