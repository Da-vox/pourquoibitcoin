import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BackgroundPaths } from "@/components/ui/background-paths";

const HeroSection = () => {
  return (
    <BackgroundPaths>
      <div className="container mx-auto px-6 text-center py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <p className="font-mono text-sm tracking-[0.3em] uppercase text-primary mb-6">
            Satoshi Nakamoto · 3 janvier 2009
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-4">
            <span className="text-gradient-btc">Pourquoi Bitcoin ?</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground font-semibold mb-6">
            La réponse simple et honnête.
          </p>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
            En 2009, 1 BTC valait <span className="text-primary font-bold">0 $</span>.
            Aujourd'hui, il vaut plus de <span className="text-primary font-bold">100 000 $</span>.
          </p>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
            21 millions. Pas un de plus. Arme-toi d'arguments pour le prochain repas de famille.
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
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg border border-primary/30 text-foreground font-semibold text-lg transition-all hover:border-primary/60 hover:bg-secondary"
            >
              Les fondamentaux
            </Link>
            <Link
              to="/securiser"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg border border-primary/30 text-foreground font-semibold text-lg transition-all hover:border-primary/60 hover:bg-secondary"
            >
              🔒 Sécuriser ses BTC
            </Link>
          </div>
        </motion.div>
      </div>
    </BackgroundPaths>
  );
};

export default HeroSection;
