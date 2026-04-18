/**
 * Bitcoin Supply Schedule - SVG illustration
 * Shows the emission curve approaching 21M BTC with halving events.
 */

const ORANGE = "hsl(30,72%,52%)";
const ORANGE_DIM = "hsl(30,60%,40%)";
const MUTED = "hsl(220,10%,48%)";
const BORDER = "hsl(222,18%,20%)";

interface DataPoint {
  year: number;
  supply: number;
}

const halvingData: DataPoint[] = [
  { year: 2009, supply: 0 },
  { year: 2012, supply: 10_500_000 },
  { year: 2016, supply: 15_750_000 },
  { year: 2020, supply: 18_375_000 },
  { year: 2024, supply: 19_687_500 },
  { year: 2028, supply: 20_343_750 },
  { year: 2032, supply: 20_671_875 },
];

const halvingRewards = ["50 BTC", "25 BTC", "12,5 BTC", "6,25 BTC", "3,125 BTC"];

const W = 520;
const H = 175;
const PAD = { top: 18, right: 30, bottom: 36, left: 46 };
const cW = W - PAD.left - PAD.right;
const cH = H - PAD.top - PAD.bottom;
const MAX_SUPPLY = 21_000_000;
const START_YEAR = 2009;
const END_YEAR = 2032;

const xS = (year: number) =>
  PAD.left + ((year - START_YEAR) / (END_YEAR - START_YEAR)) * cW;

const yS = (supply: number) =>
  PAD.top + cH - (supply / MAX_SUPPLY) * cH;

const BitcoinSupplySchedule = () => {
  const pathPoints = halvingData
    .map((p) => `${xS(p.year).toFixed(1)},${yS(p.supply).toFixed(1)}`)
    .join(" L ");

  const linePath = `M ${pathPoints}`;
  const areaPath = `M ${xS(START_YEAR)},${yS(0)} L ${pathPoints} L ${xS(END_YEAR)},${yS(0)} Z`;
  const capY = yS(MAX_SUPPLY);

  const halvingYears = halvingData.slice(1, -1).map((p) => p.year);

  return (
    <div className="w-full mt-5" aria-label="Courbe d'émission de Bitcoin">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        aria-hidden="true"
        role="img"
      >
        <defs>
          <linearGradient id="btcAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={ORANGE} stopOpacity="0.28" />
            <stop offset="100%" stopColor={ORANGE} stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="btcLineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={ORANGE_DIM} />
            <stop offset="100%" stopColor={ORANGE} />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines */}
        {[0, 0.5, 1].map((pct) => (
          <line
            key={pct}
            x1={PAD.left}
            y1={yS(MAX_SUPPLY * pct)}
            x2={W - PAD.right}
            y2={yS(MAX_SUPPLY * pct)}
            stroke={BORDER}
            strokeWidth="1"
          />
        ))}

        {/* Halving vertical dashed lines */}
        {halvingYears.map((year) => (
          <line
            key={year}
            x1={xS(year)}
            y1={PAD.top}
            x2={xS(year)}
            y2={PAD.top + cH}
            stroke={ORANGE}
            strokeWidth="1"
            strokeDasharray="3 3"
            strokeOpacity="0.35"
          />
        ))}

        {/* 21M cap dashed line */}
        <line
          x1={PAD.left}
          y1={capY}
          x2={W - PAD.right}
          y2={capY}
          stroke={ORANGE}
          strokeWidth="1.2"
          strokeDasharray="6 4"
          strokeOpacity="0.65"
        />

        {/* Gradient area fill */}
        <path d={areaPath} fill="url(#btcAreaGrad)" />

        {/* Supply curve */}
        <path
          d={linePath}
          fill="none"
          stroke="url(#btcLineGrad)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Halving dots */}
        {halvingData.slice(1, -1).map((p) => (
          <circle
            key={p.year}
            cx={xS(p.year)}
            cy={yS(p.supply)}
            r="3.5"
            fill={ORANGE}
            opacity="0.9"
          />
        ))}

        {/* Y axis labels */}
        <text
          x={PAD.left - 6}
          y={yS(0) + 4}
          textAnchor="end"
          fontSize="9"
          fill={MUTED}
        >
          0
        </text>
        <text
          x={PAD.left - 6}
          y={yS(10_500_000) + 4}
          textAnchor="end"
          fontSize="9"
          fill={MUTED}
        >
          10M
        </text>
        <text
          x={PAD.left - 6}
          y={capY + 4}
          textAnchor="end"
          fontSize="9"
          fill={ORANGE}
          fontWeight="600"
        >
          21M
        </text>

        {/* 21M cap label */}
        <text
          x={W - PAD.right - 2}
          y={capY - 5}
          textAnchor="end"
          fontSize="8"
          fill={ORANGE}
          opacity="0.8"
        >
          Limite absolue : 21 000 000 BTC
        </text>

        {/* X axis year labels */}
        {[2009, 2012, 2016, 2020, 2024, 2028, 2032].map((year) => (
          <text
            key={year}
            x={xS(year)}
            y={H - 8}
            textAnchor="middle"
            fontSize="9"
            fill={MUTED}
          >
            {year}
          </text>
        ))}

        {/* Halving "HALVING" labels above dashed lines */}
        {halvingYears.map((year, i) => (
          <text
            key={year}
            x={xS(year)}
            y={PAD.top - 5}
            textAnchor="middle"
            fontSize="7"
            fill={ORANGE}
            opacity="0.7"
            fontFamily="monospace"
            letterSpacing="0.04em"
          >
            ↓{halvingRewards[i + 1]}
          </text>
        ))}

        {/* First era reward label */}
        <text
          x={(xS(2009) + xS(2012)) / 2}
          y={PAD.top - 5}
          textAnchor="middle"
          fontSize="7"
          fill={ORANGE}
          opacity="0.7"
          fontFamily="monospace"
          letterSpacing="0.04em"
        >
          {halvingRewards[0]}
        </text>
      </svg>

      <p className="text-center text-xs text-muted-foreground mt-1 font-mono tracking-wide opacity-70">
        Récompense par bloc · Halvings marqués · Offre en BTC
      </p>
    </div>
  );
};

export default BitcoinSupplySchedule;
