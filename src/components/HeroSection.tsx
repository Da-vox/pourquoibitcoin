import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { Zap, Lock, ArrowRight, TrendingUp, Code2 } from "lucide-react";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { useBtc7DayLow } from "@/hooks/use-btc-7day-low";

const PRICE_FALLBACK_USD = 100_000;
const formatUsd = (value: number) =>
  new Intl.NumberFormat("fr-FR").format(value);

const stats = [
  { label: "Uptime", value: "99.98%" },
  { label: "Années", value: "15+" },
  { label: "Nœuds", value: "15k+" },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const HeroSection = () => {
  const btc7dLow = useBtc7DayLow();
  const priceDisplay = formatUsd(btc7dLow ?? PRICE_FALLBACK_USD);

  return (
    <BackgroundPaths>
      <div className="container mx-auto px-6 py-20 md:py-32 lg:py-40">
        <div className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-12 xl:gap-20 items-center">

          {/* Left - content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl order-1"
          >
            <motion.p
              variants={itemVariants}
              className="font-mono text-xs tracking-[0.4em] uppercase text-btc-orange mb-8"
            >
              
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-7xl xl:text-8xl font-bold tracking-tighter leading-none mb-6"
            >
              Pourquoi
              <br />
              <span className="text-btc-orange">Bitcoin ?</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-foreground font-medium mb-3"
            >
              La réponse simple et honnête.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-base text-muted-foreground leading-relaxed max-w-[55ch] mb-10"
            >
              En 2009, 1 BTC valait{" "}
              <span className="text-foreground font-semibold font-mono">0 $</span>.
              Aujourd'hui, il vaut plus de{" "}
              <span className="text-btc-orange font-semibold font-mono">{priceDisplay} $</span>.
              21 millions. Pas un de plus.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link
                to="/arguments"
                className="group relative inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-gradient-to-r from-btc-orange via-btc-gold to-btc-orange bg-[length:200%_100%] animate-gradient-slide text-primary-foreground font-bold text-base transition-all duration-300 hover:scale-[1.04] active:scale-[0.98] shadow-[0_10px_40px_-8px_hsl(var(--btc-orange)/0.5)] hover:shadow-[0_18px_60px_-8px_hsl(var(--btc-orange)/0.75)]"
              >
                <Zap className="w-4 h-4" strokeWidth={2.5} fill="currentColor" />
                Les arguments qui tuent
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
              <Link
                to="/fondamentaux"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-border text-foreground font-medium text-sm transition-all duration-200 hover:border-btc-orange/40 hover:bg-secondary active:scale-[0.98]"
              >
                <TrendingUp className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                Les fondamentaux
              </Link>
              <Link
                to="/securiser"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-border text-foreground font-medium text-sm transition-all duration-200 hover:border-btc-orange/40 hover:bg-secondary active:scale-[0.98]"
              >
                <Lock className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                Sécuriser ses BTC
              </Link>
              <Link
                to="/geek-area"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-border text-foreground font-medium text-sm transition-all duration-200 hover:border-btc-orange/40 hover:bg-secondary active:scale-[0.98]"
              >
                <Code2 className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                Geek Area
              </Link>
            </motion.div>
          </motion.div>

          {/* Right - floating stats card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.4 }}
            className="order-2 w-full md:w-auto flex justify-center md:block"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="card-glass rounded-3xl p-6 sm:p-8 w-full max-w-sm md:w-64 xl:w-72"
            >
              <p className="text-btc-orange font-bold text-5xl xl:text-6xl mb-1 font-mono leading-none">
                ₿
              </p>
              <p className="text-foreground font-bold text-3xl xl:text-4xl font-mono tracking-tight leading-none mt-4">
                21 000 000
              </p>
              <p className="text-muted-foreground text-xs font-mono uppercase tracking-widest mt-2 mb-6">
                Émission maximale
              </p>
              <div className="border-t border-border/60 pt-5 grid grid-cols-3 gap-2">
                {stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-foreground font-semibold text-sm font-mono">
                      {s.value}
                    </p>
                    <p className="text-muted-foreground text-xs mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </BackgroundPaths>
  );
};

export default HeroSection;
