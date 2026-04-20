const CZSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-btc-navy/50 to-background" />
      <div className="relative container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-btc-orange/20 bg-card/80 backdrop-blur p-8 md:p-12 glow-btc">
            <p className="font-mono text-sm tracking-[0.3em] uppercase text-btc-orange mb-6">
              Moment culte
            </p>

            {/* Vidéo YouTube embarquée */}
            <div className="mb-8 rounded-xl overflow-hidden border border-btc-orange/20">
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/LOKoe4s3RcM"
                  title="Moment culte Bitcoin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Quand <span className="text-gradient-btc">CZ</span> détruit un gold maxi en une question
            </h2>
            <blockquote className="border-l-4 border-btc-orange pl-6 my-8">
              <p className="text-xl md:text-2xl text-foreground italic leading-relaxed">
                « Ton lingot d'or… il est vrai ? Comment tu le vérifies ? Tu dois le fondre. 
                Mon Bitcoin, je le vérifie en une seconde, depuis mon téléphone, n'importe où dans le monde. »
              </p>
              <footer className="mt-4 text-muted-foreground">
                - CZ (Changpeng Zhao), fondateur de Binance
              </footer>
            </blockquote>
            <div className="grid md:grid-cols-3 gap-6 mt-10">
              <div className="text-center p-4">
                <p className="text-3xl font-bold text-gradient-btc">1 sec</p>
                <p className="text-muted-foreground mt-2">pour vérifier un Bitcoin</p>
              </div>
              <div className="text-center p-4">
                <p className="text-3xl font-bold text-gradient-btc">∞</p>
                <p className="text-muted-foreground mt-2">impossible de contrefaire</p>
              </div>
              <div className="text-center p-4">
                <p className="text-3xl font-bold text-gradient-btc">0 g</p>
                <p className="text-muted-foreground mt-2">rien à transporter</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-btc-orange/20 bg-card/80 backdrop-blur p-8 md:p-12 glow-btc mt-10">
            <p className="font-mono text-sm tracking-[0.3em] uppercase text-btc-orange mb-6">
              Moment culte
            </p>

            {/* Vidéo YouTube embarquée */}
            <div className="mb-8 rounded-xl overflow-hidden border border-btc-orange/20">
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/WXpQWpUM6dQ?start=150"
                  title="La vidéo qui m'a inspiré Pourquoi Bitcoin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              La vidéo qui a <span className="text-gradient-btc">tout déclenché</span>
            </h2>
            <p className="text-lg md:text-xl text-foreground leading-relaxed">
              C'est <span className="text-btc-orange font-semibold">cette vidéo</span> (à partir de 2m30)
              qui nous a fait prendre conscience qu'il fallait faire le site (même le devoir) <span className="text-btc-orange font-semibold">Pourquoi Bitcoin</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CZSection;
