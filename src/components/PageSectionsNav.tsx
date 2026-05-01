import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SectionLink {
  id: string;
  label: string;
}

const sections: SectionLink[] = [
  { id: "prix",       label: "BTC Cours" },
  { id: "ressources", label: "BTC Actu" },
  { id: "apropos",    label: "À propos / Contact" },
];

/**
 * Barre de navigation inter-sections sticky.
 * Apparaît après que l'utilisateur a scrollé au-delà du hero (#hero).
 * Affiche le lien de la section active en orange.
 */
const PageSectionsNav = () => {
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Affiche/masque selon la position de scroll
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // Détecte la section active
  useEffect(() => {
    const sectionEls = sections
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        // Prend la première section visible depuis le haut
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "fixed bottom-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-300",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <nav
        aria-label="Navigation entre sections"
        className="card-glass rounded-full px-2 py-1.5 flex items-center gap-0.5 shadow-btc-sm"
      >
        <div
          ref={scrollRef}
          className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide"
        >
          {sections.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollTo(id)}
              aria-label={`Aller à la section ${label}`}
              aria-current={activeId === id ? "location" : undefined}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0",
                activeId === id
                  ? "bg-btc-orange/15 text-btc-orange"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default PageSectionsNav;
