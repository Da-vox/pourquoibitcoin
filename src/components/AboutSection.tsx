import { Code, Heart, ShieldCheck } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-16 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-sm tracking-[0.3em] uppercase text-btc-orange mb-4">
            Qui sommes-nous ?
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Le mouvement <span className="text-gradient-btc">#StudyBitcoin</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Ce site fait partie du mouvement <span className="text-btc-orange font-semibold">#StudyBitcoin</span> dans le monde francophone. 
            Notre mission : expliquer et vulgariser la technique derrière Bitcoin. 
            Pas de jargon financier, pas de promesses de gains — juste de la compréhension.
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
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
