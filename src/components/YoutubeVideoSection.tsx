const YoutubeVideoSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-btc-navy/50 to-background" />
      <div className="relative container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-btc-orange/20 bg-card/80 backdrop-blur p-8 md:p-12 glow-btc">
            <p className="font-mono text-sm tracking-[0.3em] uppercase text-btc-orange mb-6">
              À regarder absolument
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              La meilleure vidéo Bitcoin{" "}
              <span className="text-gradient-btc">francophone</span>
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Si vous disposez d'une heure, cette vidéo changera votre vision de Bitcoin.
              Une masterclass complète sur ses fondements monétaires, sa rareté, sa résistance à la
              censure et son rôle dans l'histoire de la monnaie — l'une des meilleures ressources
              disponibles en français.
            </p>

            {/* Vidéo YouTube embarquée */}
            <div className="rounded-xl overflow-hidden border border-btc-orange/20">
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/uY5FTf7CsPw"
                  title="La meilleure vidéo Bitcoin francophone"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YoutubeVideoSection;
