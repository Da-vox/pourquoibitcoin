/**
 * Lightning Network Layers Diagram — SVG illustration
 * Shows Bitcoin's layered architecture: Base Layer → Lightning → Apps
 */

const ORANGE = "hsl(30,72%,52%)";
const ORANGE_BG = "hsl(30,72%,52%,0.12)";
const GOLD = "hsl(38,62%,50%)";
const MUTED = "hsl(220,10%,48%)";
const BORDER = "hsl(222,18%,22%)";
const CARD = "hsl(222,24%,12%)";

interface Layer {
  id: number;
  label: string;
  sublabel: string;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  badge: string;
}

const layers: Layer[] = [
  {
    id: 3,
    label: "Applications",
    sublabel: "Wallets · Exchanges · Paiements",
    color: "hsl(220,10%,65%)",
    bgColor: "hsl(222,18%,16%)",
    borderColor: "hsl(222,18%,28%)",
    textColor: "hsl(220,10%,80%)",
    badge: "Couche 3",
  },
  {
    id: 2,
    label: "Lightning Network",
    sublabel: "Paiements instantanés · Quasi-gratuits · Millions tx/s",
    color: GOLD,
    bgColor: "hsl(38,40%,10%)",
    borderColor: "hsl(38,50%,28%)",
    textColor: "hsl(38,70%,75%)",
    badge: "Couche 2",
  },
  {
    id: 1,
    label: "Bitcoin",
    sublabel: "Règlement final · 21M cap · Sécurité cryptographique",
    color: ORANGE,
    bgColor: "hsl(30,30%,9%)",
    borderColor: "hsl(30,50%,28%)",
    textColor: "hsl(30,72%,72%)",
    badge: "Couche 1",
  },
];

const LightningLayersDiagram = () => {
  return (
    <div className="w-full mt-5 space-y-1.5" role="img" aria-label="Architecture en couches de Bitcoin">
      {layers.map((layer, i) => (
        <div key={layer.id}>
          {/* Layer box */}
          <div
            className="relative rounded-xl px-4 py-3 border flex items-center gap-4 transition-all"
            style={{
              background: layer.bgColor,
              borderColor: layer.borderColor,
            }}
          >
            {/* Left badge */}
            <div
              className="flex-shrink-0 text-xs font-mono font-semibold px-2 py-0.5 rounded-md border"
              style={{
                color: layer.color,
                borderColor: layer.borderColor,
                background: "rgba(0,0,0,0.3)",
              }}
            >
              {layer.badge}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-bold tracking-tight"
                style={{ color: layer.textColor }}
              >
                {layer.label}
              </p>
              <p className="text-xs mt-0.5" style={{ color: MUTED }}>
                {layer.sublabel}
              </p>
            </div>

            {/* Right indicator dot */}
            <div
              className="flex-shrink-0 w-2 h-2 rounded-full"
              style={{ background: layer.color, opacity: 0.85 }}
            />
          </div>

          {/* Connector arrow between layers */}
          {i < layers.length - 1 && (
            <div className="flex justify-center py-0.5">
              <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true">
                <line
                  x1="8"
                  y1="0"
                  x2="8"
                  y2="10"
                  stroke={BORDER}
                  strokeWidth="1.5"
                />
                <polyline
                  points="4,6 8,11 12,6"
                  fill="none"
                  stroke={BORDER}
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
      ))}

      <p className="text-center text-xs font-mono tracking-wide mt-2" style={{ color: MUTED }}>
        Bitcoin scale en couches · Comme Internet (TCP/IP → HTTP → Web)
      </p>
    </div>
  );
};

export default LightningLayersDiagram;
