import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Accueil", to: "/" },
  { label: "Fondamentaux", to: "/fondamentaux" },
  { label: "Arguments", to: "/arguments" },
  { label: "Sécuriser", to: "/securiser" },
  { label: "Geek Area", to: "/geek-area" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    /* Mobile: stretches left-3 right-3 (full width minus margins)
       Desktop: centered auto-width pill */
    <nav className="fixed top-3 z-50 card-glass rounded-2xl md:rounded-full px-2 py-1.5 left-3 right-3 md:left-1/2 md:right-auto md:w-auto md:-translate-x-1/2">
      {/* Fade-out indicator on the right edge — visible only when content overflows */}
      <div className="relative">
        <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide">
          <Link
            to="/"
            className="text-btc-orange font-bold text-xl px-3 py-1.5 mr-1 leading-none flex-shrink-0"
            aria-label="Accueil"
          >
            ₿
          </Link>
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
        {/* Right-side gradient fade — hints at scroll on small screens */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[hsl(222_24%_10%/0.9)] to-transparent rounded-r-2xl md:hidden" />
      </div>
    </nav>
  );
};

export default Navbar;
