import { Link } from "react-router-dom";
import heroImage from "@/assets/btc-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Bitcoin illuminé"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center py-20">
        <p className="font-mono text-sm tracking-[0.3em] uppercase text-btc-orange mb-6">
          Satoshi Nakamoto · 3 janvier 2009
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8">
          <span className="text-gradient-btc">Bitcoin</span>
          <br />
          <span className="text-foreground">est inévitable.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
          21 millions. Pas un de plus. La monnaie la plus dure jamais créée par l'humanité.
          Arme-toi d'arguments pour le prochain repas de famille.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/arguments"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-gradient-btc text-primary-foreground font-semibold text-lg transition-all hover:scale-105 glow-btc"
          >
            ⚡ Les arguments qui tuent
          </Link>
          <Link
            to="/fondamentaux"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg border border-btc-orange/30 text-foreground font-semibold text-lg transition-all hover:border-btc-orange/60 hover:bg-secondary"
          >
            Les fondamentaux
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
