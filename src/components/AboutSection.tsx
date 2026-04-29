import { Code, Heart, Mail, Send, ShieldCheck } from "lucide-react";

const CONTACT_EMAIL = "contact@pourquoibitcoin.fr";

const AboutSection = () => {
  const subject = encodeURIComponent("Contact depuis le site Bitcoin");
  const body = encodeURIComponent("Bonjour,\n\n");

  return (
    <section className="py-10 md:py-16 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-sm tracking-[0.3em] uppercase text-btc-orange mb-4">
            Qui sommes-nous ?
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Le mouvement <span className="text-gradient-btc">#StudyBitcoin</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Ce site, réalisé via les IA Claude et Lovable fait partie du mouvement <span className="text-btc-orange font-semibold">#StudyBitcoin</span> dans le monde francophone.
            <br /><br />Notre mission 100% altruiste : expliquer et vulgariser la technique derrière Bitcoin.
            Pas de jargon financier, pas de promesses de gains - juste de la compréhension.
            <br /><br />Notre référent francophone : Lionel Dricot
          </p>
          <div className="grid sm:grid-cols-3 gap-6 mt-8">
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-card/50">
              <Code className="w-6 h-6 text-btc-orange" />
              <p className="text-sm text-foreground font-semibold">Pour les geeks</p>
              <p className="text-xs text-muted-foreground">Pas pour les traders en costume</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-card/50">
              <ShieldCheck className="w-6 h-6 text-btc-orange" />
              <p className="text-sm text-foreground font-semibold">Conseillers techniques</p>
              <p className="text-xs text-muted-foreground">Aucun conseil financier ici</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-card/50">
              <Heart className="w-6 h-6 text-btc-orange" />
              <p className="text-sm text-foreground font-semibold">Par passion</p>
              <p className="text-xs text-muted-foreground">Open source, communautaire</p>
            </div>
          </div>

          <div className="mt-12 md:mt-16 pt-10 border-t border-border">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Mail className="h-7 w-7 text-primary" />
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">Nous contacter</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Nous tenons à rester anonymes par principe, mais nous sommes ouverts aux échanges.<br /><br />Vous avez une question sur Bitcoin ? Vous souhaitez échanger, partager ou publier des informations et articles sur notre site ? N’hésitez pas à nous écrire !
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              <Send className="h-5 w-5" />
              Nous envoyer un message
            </a>
            <p className="text-muted-foreground text-sm mt-4 font-mono">
              {CONTACT_EMAIL}
            </p>
            <p className="text-xs text-muted-foreground/80 mt-6 max-w-xl mx-auto">
              <span className="font-semibold text-foreground">TRÈS IMPORTANT :</span> Nous ne demandons jamais d’informations personnelles, d’argent ou de connexion à des wallets. Si une telle demande vous est faite, il s’agit d’une arnaque/hack, arrêtez la communication et signalez-le immédiatement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
