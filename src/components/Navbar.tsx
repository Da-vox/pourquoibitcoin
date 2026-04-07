import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Accueil", to: "/" },
  { label: "Fondamentaux", to: "/fondamentaux" },
  { label: "Arguments", to: "/arguments" },
  { label: "Sécuriser", to: "/securiser" },
  { label: "Actualités", to: "https://www.veillebitcoin.fr", external: true },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="text-gradient-btc text-2xl font-bold font-display">
          ₿
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) =>
            item.external ? (
              <a
                key={item.to}
                href={item.to}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === item.to
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl px-6 py-4 space-y-2">
          {navItems.map((item) =>
            item.external ? (
              <a
                key={item.to}
                href={item.to}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === item.to
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
