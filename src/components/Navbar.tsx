import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";

const navItems = [
  { label: "Accueil", to: "/" },
  { label: "Fondamentaux", to: "/fondamentaux" },
  { label: "Arguments", to: "/arguments" },
  { label: "Sécuriser", to: "/securiser" },
  { label: "Geek Area", to: "/geek-area" },
];

const Navbar = () => {
  const location = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const update = () => {
      const hasOverflow = el.scrollWidth > el.clientWidth;
      const notAtEnd = el.scrollLeft < el.scrollWidth - el.clientWidth - 4;
      setShowArrow(hasOverflow && notAtEnd);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    /* Mobile: stretches left-3 right-3 (full width minus margins)
       Desktop: centered auto-width pill */
    <nav className="fixed top-3 z-50 card-glass rounded-2xl md:rounded-full px-2 py-1.5 left-3 right-3 md:left-1/2 md:right-auto md:w-auto md:-translate-x-1/2">
      <div className="relative flex items-center">
        {/* ₿ logo - toujours visible, hors du conteneur scrollable */}
        <Link
          to="/"
          className="text-btc-orange font-bold text-xl px-3 py-1.5 mr-1 leading-none flex-shrink-0"
          aria-label="Accueil"
        >
          ₿
        </Link>

        {/* Onglets scrollables */}
        <div
          ref={scrollRef}
          className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide"
        >
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex-shrink-0 whitespace-nowrap",
                location.pathname === item.to
                  ? "bg-btc-orange/15 text-btc-orange"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Flèche scroll - visible sur mobile uniquement tant qu'il reste du contenu à droite */}
        <div
          className={cn(
            "md:hidden absolute right-0 top-0 bottom-0 flex items-center justify-end pointer-events-none rounded-r-2xl transition-opacity duration-300",
            showArrow ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="w-10 h-full bg-gradient-to-l from-[hsl(222_32%_8%/0.95)] to-transparent rounded-r-2xl flex items-center justify-end pr-1.5">
            <ChevronRight className="text-btc-orange w-4 h-4 animate-bounce-x" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
