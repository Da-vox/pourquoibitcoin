import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Accueil", to: "/" },
  { label: "Fondamentaux", to: "/fondamentaux" },
  { label: "Arguments", to: "/arguments" },
  { label: "Sécuriser", to: "/securiser" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 card-glass rounded-full px-2 py-1.5">
      <div className="flex items-center gap-0.5">
        <Link
          to="/"
          className="text-btc-orange font-bold text-xl px-3 py-1.5 mr-1 leading-none"
          aria-label="Accueil"
        >
          ₿
        </Link>
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
              location.pathname === item.to
                ? "bg-btc-orange/15 text-btc-orange"
                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
