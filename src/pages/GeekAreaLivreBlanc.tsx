import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ShareButtons from "@/components/ShareButtons";
import Seo, { buildBreadcrumb, SITE_URL } from "@/components/Seo";
import {
  BookOpen,
  BookA,
  ArrowLeft,
  Server,
  Cpu,
  ExternalLink,
  FileText,
  Key,
  Clock,
  Zap,
  Network,
  Coins,
  Eye,
  Calculator,
  CheckCircle,
  Shield,
  Hash,
} from "lucide-react";
import MerkleTreeDiagram from "@/components/illustrations/MerkleTreeDiagram";

const livreBlancJsonLd = [
  buildBreadcrumb([
    { name: "Accueil", path: "/" },
    { name: "Geek Area", path: "/geek-area" },
    { name: "Livre Blanc Satoshi", path: "/geek-area/livre-blanc" },
  ]),
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}/geek-area/livre-blanc#article`,
    headline: "Le livre blanc de Satoshi Nakamoto : résumé chapitre par chapitre",
    description:
      "Résumé structuré du livre blanc Bitcoin publié par Satoshi Nakamoto en 2008, chapitre par chapitre.",
    inLanguage: "fr-FR",
    author: { "@type": "Person", name: "Satoshi Nakamoto" },
    publisher: {
      "@type": "Organization",
      name: "Pourquoi Bitcoin",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg` },
    },
    image: `${SITE_URL}/og-image.jpg`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/geek-area/livre-blanc`,
    },
    about: {
      "@type": "Book",
      name: "Bitcoin: A Peer-to-Peer Electronic Cash System",
      author: { "@type": "Person", name: "Satoshi Nakamoto" },
      datePublished: "2008-10-31",
      inLanguage: "en",
    },
    datePublished: "2008-10-31",
    dateModified: "2026-04-27",
    keywords: [
      "livre blanc bitcoin",
      "bitcoin whitepaper",
      "satoshi nakamoto",
      "proof of work",
      "merkle tree",
    ],
  },
];

const chapters = [
  {
    num: "01",
    icon: FileText,
    title: "Introduction",
    concept: "Le problème de la double dépense",
    summary:
      "Le système financier traditionnel repose sur des institutions de confiance (banques, PayPal) pour valider les paiements électroniques. Ce modèle engendre des coûts élevés, des risques de fraude et des réversibilités de transactions indésirables. Satoshi Nakamoto propose une solution radicale : un système de paiement pair-à-pair basé uniquement sur la cryptographie, où la confiance dans les tiers est remplacée par une preuve mathématique vérifiable par tous.",
    keyPoint: "La confiance est remplacée par la cryptographie.",
  },
  {
    num: "02",
    icon: Key,
    title: "Transactions",
    concept: "Une chaîne de signatures numériques",
    summary:
      "Dans Bitcoin, une pièce est définie comme une chaîne de signatures numériques. Chaque propriétaire transfère la pièce au suivant en signant numériquement un hash de la transaction précédente et la clé publique du destinataire. Le problème du double dépense (utiliser le même bitcoin deux fois) est résolu par un registre public de toutes les transactions, où la première transaction diffusée est considérée comme valide par l'ensemble du réseau.",
    keyPoint: "Posséder des bitcoins, c'est posséder des clés privées permettant de signer des transactions.",
  },
  {
    num: "03",
    icon: Clock,
    title: "Serveur d'Horodatage",
    concept: "Prouver l'existence dans le temps",
    summary:
      "Pour prouver qu'une transaction existait à un moment précis, Bitcoin utilise un serveur d'horodatage distribué. Ce serveur prend le hash d'un bloc de transactions et le publie sur le réseau. Chaque timestamp inclut le timestamp précédent dans son hash, formant une chaîne inaltérable. Il devient mathématiquement impossible de modifier une transaction passée sans recalculer tous les blocs suivants - ce qui exigerait une puissance de calcul colossale.",
    keyPoint: "Chaque bloc de la blockchain contient la preuve que tous les blocs précédents existaient déjà.",
  },
  {
    num: "04",
    icon: Zap,
    title: "Preuve de Travail",
    concept: "Le moteur de la sécurité",
    summary:
      "Le système de Proof-of-Work s'inspire d'Hashcash d'Adam Back. Pour ajouter un bloc à la chaîne, les mineurs doivent trouver un nonce (nombre arbitraire) tel que le hash du bloc commence par un certain nombre de zéros. Ce travail est coûteux en énergie mais facile à vérifier. La difficulté s'ajuste automatiquement pour maintenir un bloc toutes les 10 minutes. La chaîne la plus longue représente le consensus : elle concentre le plus de travail accumulé, donc de sécurité.",
    keyPoint: "La sécurité de Bitcoin repose sur la quantité d'énergie physique dépensée pour construire la blockchain.",
  },
  {
    num: "05",
    icon: Network,
    title: "Le Réseau",
    concept: "Un consensus décentralisé",
    summary:
      "Le réseau Bitcoin fonctionne en 6 étapes cycliques : (1) les nouvelles transactions sont diffusées à tous les nœuds, (2) chaque nœud collecte les transactions en attente dans un bloc, (3) les mineurs cherchent une preuve de travail valide, (4) le premier qui en trouve une diffuse son bloc, (5) les nœuds acceptent le bloc si toutes les transactions sont valides, (6) ils expriment leur acceptation en commençant à travailler sur le bloc suivant. En cas de conflit, la chaîne la plus longue gagne toujours.",
    keyPoint: "Les nœuds votent avec leur puissance de calcul : la chaîne gagnante est celle qui a le plus de travail accumulé.",
  },
  {
    num: "06",
    icon: Coins,
    title: "Incentive",
    concept: "Pourquoi les mineurs jouent honnêtement",
    summary:
      "Le premier mineur à trouver un bloc valide reçoit une récompense en bitcoins nouvellement créés - c'est le seul mécanisme de création monétaire de Bitcoin. Au fil des halvings, cette récompense diminue et est progressivement remplacée par les frais de transaction. Satoshi démontre que pour un attaquant disposant d'une majorité de la puissance de calcul, il serait toujours plus rentable de miner honnêtement que d'attaquer le réseau, car une attaque détruirait la valeur même des bitcoins qu'il possède.",
    keyPoint: "Le protocole aligne les intérêts économiques des participants avec la sécurité du réseau.",
  },
  {
    num: "07",
    icon: Hash,
    title: "Récupération d'Espace Disque",
    concept: "Les arbres de Merkle",
    summary:
      "À mesure que la blockchain grandit, stocker toutes les transactions devient coûteux. Satoshi propose les arbres de Merkle : une structure de données qui permet de résumer toutes les transactions d'un bloc en un seul hash (la racine Merkle). Seule cette racine est conservée dans l'en-tête du bloc. Les vieilles transactions confirmées peuvent être élagées sans compromettre l'intégrité de la chaîne. Seuls les en-têtes de blocs (80 octets chacun) suffisent pour vérifier la chaîne.",
    keyPoint: "80 octets par bloc × 6 blocs/heure × 8760 heures/an = ~4,2 Mo par an pour stocker tous les en-têtes.",
  },
  {
    num: "08",
    icon: Eye,
    title: "Vérification de Paiement Simplifiée",
    concept: "Vérifier sans tout télécharger (SPV)",
    summary:
      "Il est possible de vérifier des paiements sans télécharger la blockchain complète. Un utilisateur n'a besoin que des en-têtes de blocs et de la branche Merkle reliant sa transaction à son bloc. Il vérifie que la transaction est incluse dans un bloc, puis que ce bloc est bien ancré dans la chaîne la plus longue (via les preuves de travail qui suivent). C'est moins sûr qu'un nœud complet mais suffisant pour des paiements quotidiens sur des appareils avec peu de ressources (smartphones, etc.).",
    keyPoint: "C'est le principe utilisé par les wallets mobiles et les wallets légers (SPV wallets).",
  },
  {
    num: "09",
    icon: Zap,
    title: "Combinaison et Division de Valeur",
    concept: "Le système UTXO",
    summary:
      "Bien que chaque satoshi puisse théoriquement être tracé individuellement, les envoyer séparément serait inefficace. Bitcoin permet à une transaction d'avoir plusieurs inputs (fusionnant plusieurs pièces reçues) et plusieurs outputs (envoyant vers plusieurs destinataires simultanément). Le « change » (la monnaie rendue) est renvoyé vers une nouvelle adresse du même portefeuille. Ce système d'UTXO (Unspent Transaction Outputs) est l'épine dorsale comptable de Bitcoin.",
    keyPoint: "Chaque bitcoin que tu possèdes est en réalité un ou plusieurs UTXO - des sorties de transactions précédentes non encore dépensées.",
  },
  {
    num: "10",
    icon: Shield,
    title: "Confidentialité",
    concept: "Pseudonymie, pas anonymat",
    summary:
      "Le modèle bancaire maintient la confidentialité en limitant l'accès aux registres. Bitcoin, avec sa blockchain publique, ne peut pas cacher les transactions. La confidentialité repose sur la pseudonymie : les identités sont représentées par des paires de clés cryptographiques, sans lien direct avec des personnes réelles. Pour maximiser la confidentialité, il est recommandé d'utiliser une nouvelle adresse pour chaque transaction. Attention : les inputs multiples d'une transaction révèlent souvent qu'ils appartiennent au même propriétaire.",
    keyPoint: "Bitcoin est pseudonyme, pas anonyme. Toutes les transactions sont publiques - seules les identités des adresses sont masquées.",
  },
  {
    num: "11",
    icon: Calculator,
    title: "Calculs",
    concept: "La math derrière la sécurité",
    summary:
      "Satoshi modélise la sécurité de Bitcoin avec une marche aléatoire (problème du joueur en faillite). Un attaquant contrôlant une fraction q de la puissance de calcul (inférieure à 50 %) a une probabilité exponentiellement décroissante de rattraper la chaîne honnête à mesure que les blocs s'accumulent. Exemple : avec 30 % de la puissance totale, après 24 blocs confirmés, la probabilité de succès de l'attaquant est inférieure à 0,1 %. C'est la base mathématique du concept de « confirmations ».",
    keyPoint: "C'est pourquoi on considère une transaction comme « définitive » après 6 confirmations (~1 heure).",
  },
  {
    num: "12",
    icon: CheckCircle,
    title: "Conclusion",
    concept: "La synthèse de Satoshi",
    summary:
      "Satoshi conclut en décrivant Bitcoin comme un système de monnaie électronique pair-à-pair robuste ne reposant sur aucune confiance. Les deux piliers du système sont : la structure des nœuds (qui valident les règles) et la preuve de travail (qui crée le consensus sur l'historique). Les nœuds peuvent rejoindre et quitter librement le réseau, la preuve de travail servant de preuve du passé pendant les absences. La règle de la majorité et le mécanisme d'incentive rendent toute tentative de fraude moins rentable que la participation honnête.",
    keyPoint: "9 pages ont suffi à Satoshi pour décrire un système monétaire entièrement nouveau qui fonctionne sans confiance.",
  },
];

const otherSections = [
  {
    icon: Server,
    title: "Nœud Bitcoin",
    description: "Guide complet pour installer Bitcoin Core et valider toi-même les transactions.",
    href: "/geek-area/noeud-bitcoin",
  },
  {
    icon: Cpu,
    title: "Hardware Wallet DIY",
    description: "Construis ton propre portefeuille matériel open source avec SeedSigner pour moins de 50 €.",
    href: "/geek-area/hardware-wallet",
  },
  {
    icon: BookA,
    title: "Dictionnaire Pandul",
    description: "Le meilleur lexique Bitcoin open source en français, maintenu par la communauté.",
    href: "/geek-area/dictionnaire",
  },
];

const GeekAreaLivreBlanc = () => {
  return (
    <main className="min-h-screen bg-background">
      <Seo
        title="Livre blanc de Satoshi Nakamoto : résumé chapitre par chapitre"
        description="Le livre blanc Bitcoin de Satoshi Nakamoto (2008) expliqué chapitre par chapitre en français : transactions, timestamp, proof of work, réseau, preuve simplifiée et arbre de Merkle."
        path="/geek-area/livre-blanc"
        keywords="livre blanc bitcoin, whitepaper bitcoin, satoshi nakamoto, proof of work, merkle tree, double dépense, peer-to-peer electronic cash"
        type="article"
        articleSection="Geek Area"
        publishedTime="2008-10-31T00:00:00Z"
        modifiedTime="2026-04-27T00:00:00+02:00"
        jsonLd={livreBlancJsonLd}
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
              <BookOpen className="w-7 h-7 text-primary-foreground" />
            </div>
            <p className="font-mono text-sm tracking-[0.3em] uppercase text-btc-orange mb-4">
              Section 03 - Geek Area
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Le{" "}
              <span className="text-gradient-btc">Livre Blanc</span>
              <br />
              de Satoshi
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-6">
              Le 31 octobre 2008, Satoshi Nakamoto publie 9 pages qui allaient
              changer le monde de la finance. « Bitcoin: A Peer-to-Peer
              Electronic Cash System » - expliqué simplement, chapitre par
              chapitre.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-btc-orange/30 bg-btc-orange/5 text-btc-orange text-sm font-mono">
              <FileText className="w-3.5 h-3.5" />
              12 chapitres · Publié le 31 oct. 2008
            </div>
          </div>
        </section>

        {/* ══ Chapitres ══ */}
        <section className="py-14 md:py-20 border-t border-border">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto mb-14 text-center">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
                Résumé{" "}
                <span className="text-gradient-btc">chapitre par chapitre</span>
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                Chaque section du livre blanc dépose une brique essentielle du
                protocole. Voici ce que Satoshi explique, et pourquoi ça change
                tout.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {chapters.map((chapter) => (
                <div
                  key={chapter.num}
                  className="rounded-xl border border-border bg-card/50 p-6 hover:border-btc-orange/30 transition-colors"
                >
                  <div className="flex gap-4 items-start">
                    {/* Numéro */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-btc flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {chapter.num}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Titre + concept */}
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-bold text-foreground text-base">
                          {chapter.title}
                        </h3>
                        <span className="text-xs font-mono text-btc-orange border border-btc-orange/30 rounded-full px-2 py-0.5">
                          {chapter.concept}
                        </span>
                      </div>

                      {/* Résumé */}
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {chapter.summary}
                      </p>

                      {/* Point clé */}
                      <div className="flex items-start gap-2 p-3 rounded-lg border border-btc-orange/20 bg-btc-orange/5">
                        <chapter.icon className="w-3.5 h-3.5 text-btc-orange flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-btc-orange font-medium leading-relaxed">
                          {chapter.keyPoint}
                        </p>
                      </div>

                      {/* Merkle tree illustration for chapter 07 */}
                      {chapter.num === "07" && <MerkleTreeDiagram />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA lire l'original ── */}
        <section className="py-14 border-t border-border">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center rounded-xl border border-btc-orange/30 bg-card p-10 glow-btc-sm">
              <BookOpen className="w-10 h-10 text-btc-orange mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-3">
                Lire l'original
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Le livre blanc original de Satoshi Nakamoto est disponible
                librement. 9 pages, rédigées en anglais, qui restent la
                référence absolue pour comprendre Bitcoin à la source.
              </p>
              <a
                href="https://bitcoin.org/bitcoin.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-btc text-primary-foreground font-semibold text-sm transition-all hover:scale-105 glow-btc"
              >
                bitcoin.org/bitcoin.pdf <ExternalLink className="w-4 h-4" />
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
              Partage le résumé du livre blanc avec d'autres bitcoiners
            </p>
            <ShareButtons title="Le Livre Blanc de Satoshi expliqué - Geek Area" />
          </div>
        </section>
      </div>
      <FooterSection />
    </main>
  );
};

export default GeekAreaLivreBlanc;
