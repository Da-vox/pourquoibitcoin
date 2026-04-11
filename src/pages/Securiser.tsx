import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import ShareButtons from "@/components/ShareButtons";
import { Shield, Key, AlertTriangle, CheckCircle, ExternalLink } from "lucide-react";

const steps = [
  {
    icon: AlertTriangle,
    title: "1. Comprendre le risque",
    content:
      "Si tes bitcoins sont sur un exchange (Binance, Coinbase…), ils ne t'appartiennent pas vraiment. L'exchange détient tes clés privées. S'il fait faillite (comme FTX en 2022), tes fonds disparaissent. La règle d'or :",
    highlight: "\"Not your keys, not your coins.\"",
  },
  {
    icon: Key,
    title: "2. Qu'est-ce qu'un hardware wallet ?",
    content:
      "Un hardware wallet (portefeuille matériel) est un petit appareil physique qui stocke tes clés privées HORS LIGNE. Même si ton ordinateur est infecté par un virus, tes bitcoins restent en sécurité. C'est comme un coffre-fort de poche pour tes cryptos.",
    highlight: null,
  },
  {
    icon: Shield,
    title: "3. Pourquoi Ledger ?",
    content:
      "Ledger est le leader mondial des hardware wallets, basé en France. Plus de 6 millions d'unités vendues. Le Ledger Nano S Plus (~79€) ou le Ledger Flex (~249€) sont les modèles les plus populaires. L'appareil génère et stocke tes clés privées dans une puce sécurisée certifiée (CC EAL5+).",
    highlight: null,
  },
];

const setupSteps = [
  "Commande ton Ledger uniquement sur le site officiel (jamais sur Amazon ou d'occasion).",
  "Télécharge l'app Ledger Live sur ton ordinateur ou smartphone.",
  "Branche ton Ledger et suis les instructions d'initialisation.",
  "NOTE ta seed phrase (24 mots) sur PAPIER. Active l'option du 25eme mot, technique (details sur internet) mais c'est la sécu idéale . Ne la photographie JAMAIS. Ne la stocke JAMAIS en numérique.",
  "Range ta seed phrase dans un endroit sûr (coffre-fort à la banque, cela coûte que 10€ par mois, chez un notaire…). C'est ta sauvegarde ultime.",
  "Installe l'app Bitcoin sur ton Ledger via Ledger Live.",
  "Transfère tes BTC depuis l'exchange vers ton adresse Ledger.",
  "Vérifie l'adresse de réception directement sur l'écran du Ledger avant de confirmer.",
];

const Securiser = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <section className="py-14 md:py-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-10 md:mb-16">
              <p className="font-mono text-sm tracking-[0.3em] uppercase text-btc-orange mb-4">
                Protège tes satoshis
              </p>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                <span className="text-gradient-btc">Sécuriser</span> ses Bitcoin
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8">
                Le guide simple pour protéger tes BTC avec un hardware wallet.
                Pas besoin d'être un expert — juste de suivre les étapes.
              </p>
              <ShareButtons title="Comment sécuriser ses Bitcoin simplement" />
            </div>

            {/* Étapes d'explication */}
            <div className="max-w-3xl mx-auto space-y-8 mb-20">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-card/50 p-8 hover:border-btc-orange/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-btc flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">
                      {step.title}
                    </h2>
                  </div>
                  <p className="text-secondary-foreground leading-relaxed">
                    {step.content}
                  </p>
                  {step.highlight && (
                    <p className="mt-4 text-btc-orange font-bold text-lg italic">
                      {step.highlight}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Guide de configuration */}
            <div className="max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                🛠️ Configuration <span className="text-gradient-btc">étape par étape</span>
              </h2>
              <div className="space-y-4">
                {setupSteps.map((step, i) => (
                  <div
                    key={i}
                    className="flex gap-4 items-start p-5 rounded-xl border border-border bg-card/50"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-btc flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {i + 1}
                    </div>
                    <p className="text-secondary-foreground leading-relaxed pt-1">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Erreurs à éviter */}
            <div className="max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                ⚠️ Les erreurs <span className="text-gradient-btc">à ne jamais faire</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Acheter un Ledger d'occasion ou sur un site tiers",
                  "Stocker sa seed phrase sur un téléphone ou ordinateur",
                  "Partager sa seed phrase avec qui que ce soit",
                  "Prendre une photo de sa seed phrase",
                  "Entrer sa seed phrase sur un site web",
                  "Ignorer les mises à jour de firmware",
                ].map((err, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 rounded-lg border border-destructive/30 bg-destructive/5"
                  >
                    <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <p className="text-secondary-foreground text-sm">{err}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Ledger */}
            <div className="max-w-2xl mx-auto text-center rounded-xl border border-btc-orange/30 bg-card p-10 glow-btc-sm">
              <CheckCircle className="w-12 h-12 text-btc-orange mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-3">
                Prêt à sécuriser tes BTC ?
              </h2>
              <p className="text-muted-foreground mb-6">
                Commande ton Ledger sur le site officiel. C'est l'investissement
                le plus important que tu feras pour protéger ton patrimoine.
              </p>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-btc text-primary-foreground font-semibold text-lg transition-all hover:scale-105 glow-btc"
                id="ledger-affiliate-link"
              >
                Commander un Ledger <ExternalLink className="w-5 h-5" />
              </a>
              <p className="text-muted-foreground text-xs mt-4">
                Lien affilié — tu soutiens le site sans surcoût pour toi.
              </p>
            </div>
          </div>
        </section>
      </div>
      <FooterSection />
    </main>
  );
};

export default Securiser;
