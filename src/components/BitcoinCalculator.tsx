import { useState, useMemo } from "react";
import { TrendingUp } from "lucide-react";

// Prix BTC approx. début d'année en USD (source : données historiques CoinGecko)
const BTC_PRICES: Record<number, number> = {
  2011: 0.3,
  2012: 5,
  2013: 13,
  2014: 770,
  2015: 270,
  2016: 430,
  2017: 1000,
  2018: 14000,
  2019: 3700,
  2020: 7200,
  2021: 29000,
  2022: 47000,
  2023: 16500,
  2024: 42000,
  2025: 94000,
};

// Prix de l'or en EUR/once troy (approx. début d'année)
const GOLD_PRICES_EUR: Record<number, number> = {
  2011: 1100,
  2012: 1250,
  2013: 1190,
  2014: 870,
  2015: 1000,
  2016: 1000,
  2017: 1130,
  2018: 1090,
  2019: 1110,
  2020: 1420,
  2021: 1660,
  2022: 1625,
  2023: 1800,
  2024: 1960,
  2025: 3000,
};

// Taux de change USD→EUR (approximation fixe pour la simulation)
const USD_TO_EUR = 0.92;

const CURRENT_BTC_PRICE_EUR = Math.round(105000 * USD_TO_EUR); // ≈ 96 600 €
const CURRENT_GOLD_PRICE_EUR = 3000; // €/once (avril 2025)
const SAVINGS_RATE = 0.02; // 2 %/an (Livret A historique)
const CURRENT_YEAR = 2025;

const years = Object.keys(BTC_PRICES).map(Number).sort((a, b) => a - b);

type Mode = "unique" | "dca";

interface CalcResult {
  totalInvested: number;
  btcAccumulated: number;
  btcValue: number;
  savingsValue: number;
  goldValue: number;
}

const formatEur = (v: number) =>
  v.toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });

const formatMultiplier = (ratio: number) => {
  if (ratio >= 10) return `×${Math.round(ratio).toLocaleString("fr-FR")}`;
  return `×${ratio.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}`;
};

// ─────────────────────────────────────────
// Barre de comparaison
// ─────────────────────────────────────────
const CompBar = ({
  emoji,
  label,
  value,
  ratio,
  maxValue,
  textClass,
  barClass,
}: {
  emoji: string;
  label: string;
  value: number;
  ratio: number;
  maxValue: number;
  textClass: string;
  barClass: string;
}) => {
  const pct = maxValue > 0 ? Math.max(2, (value / maxValue) * 100) : 0;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2 text-sm">
        <span className="text-foreground font-medium">
          {emoji} {label}
        </span>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-muted-foreground font-mono text-xs hidden sm:block">
            {formatEur(value)}
          </span>
          <span className={`font-mono font-bold ${textClass}`}>
            {formatMultiplier(ratio)}
          </span>
        </div>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${barClass} transition-all duration-700 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-muted-foreground font-mono text-xs sm:hidden">
        {formatEur(value)}
      </p>
    </div>
  );
};

// ─────────────────────────────────────────
// Composant principal
// ─────────────────────────────────────────
const BitcoinCalculator = () => {
  const [mode, setMode] = useState<Mode>("unique");

  // Mode investissement unique
  const [amount, setAmount] = useState(1000);
  const [year, setYear] = useState(2015);

  // Mode DCA mensuel
  const [monthly, setMonthly] = useState(50);
  const [startYear, setStartYear] = useState(2015);

  const result = useMemo<CalcResult | null>(() => {
    if (mode === "unique") {
      const priceUsd = BTC_PRICES[year];
      const goldEur = GOLD_PRICES_EUR[year];
      if (!priceUsd || !goldEur) return null;

      const priceEur = priceUsd * USD_TO_EUR;
      const yearsElapsed = CURRENT_YEAR - year;

      const btcAccumulated = amount / priceEur;
      const btcValue = btcAccumulated * CURRENT_BTC_PRICE_EUR;
      const savingsValue = amount * Math.pow(1 + SAVINGS_RATE, yearsElapsed);
      const goldValue = (amount / goldEur) * CURRENT_GOLD_PRICE_EUR;

      return { totalInvested: amount, btcAccumulated, btcValue, savingsValue, goldValue };
    }

    // DCA mensuel : on accumule année par année
    let totalInvested = 0;
    let btcAccumulated = 0;
    let savingsValue = 0;
    let goldValue = 0;

    for (let y = startYear; y <= CURRENT_YEAR; y++) {
      const priceUsd = BTC_PRICES[y];
      const goldEur = GOLD_PRICES_EUR[y];
      if (!priceUsd || !goldEur) continue;

      const priceEur = priceUsd * USD_TO_EUR;
      const yearlyInvest = monthly * 12;
      const yearsRemaining = CURRENT_YEAR - y;

      totalInvested += yearlyInvest;
      btcAccumulated += yearlyInvest / priceEur;
      savingsValue += yearlyInvest * Math.pow(1 + SAVINGS_RATE, yearsRemaining);
      goldValue += (yearlyInvest / goldEur) * CURRENT_GOLD_PRICE_EUR;
    }

    if (totalInvested === 0) return null;

    const btcValue = btcAccumulated * CURRENT_BTC_PRICE_EUR;
    return { totalInvested, btcAccumulated, btcValue, savingsValue, goldValue };
  }, [mode, amount, year, monthly, startYear]);

  const maxValue = result
    ? Math.max(result.btcValue, result.savingsValue, result.goldValue)
    : 1;

  const inputClass =
    "w-full rounded-lg bg-muted border border-border px-4 py-3 text-foreground text-lg font-mono focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <section id="simulateur" className="py-14 md:py-24 bg-btc-dark">
      <div className="container mx-auto px-6">
        {/* En-tête */}
        <div className="text-center mb-8 md:mb-12">
          <p className="font-mono text-sm tracking-[0.3em] uppercase text-btc-orange mb-4">
            Simulateur
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="text-gradient-btc">Calculateur</span> Bitcoin
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Combien vaudraient tes euros si tu les avais investis dans Bitcoin ?
          </p>
        </div>

        <div className="max-w-lg mx-auto rounded-xl border border-border bg-card p-6 md:p-8 space-y-6">

          {/* Toggle mode */}
          <div className="flex rounded-lg overflow-hidden border border-border text-sm font-medium">
            {(["unique", "dca"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2.5 transition-colors ${
                  mode === m
                    ? "bg-btc-orange text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {m === "unique" ? "Investissement unique" : "DCA mensuel"}
              </button>
            ))}
          </div>

          {/* Champs selon le mode */}
          {mode === "unique" ? (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Montant investi (€)
                </label>
                <input
                  type="number"
                  min={1}
                  value={amount}
                  onChange={(e) => setAmount(Math.max(1, Number(e.target.value)))}
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Année d'investissement
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className={inputClass}
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Montant mensuel (€/mois)
                </label>
                <input
                  type="number"
                  min={1}
                  value={monthly}
                  onChange={(e) => setMonthly(Math.max(1, Number(e.target.value)))}
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Depuis (année de départ)
                </label>
                <select
                  value={startYear}
                  onChange={(e) => setStartYear(Number(e.target.value))}
                  className={inputClass}
                >
                  {years
                    .filter((y) => y < CURRENT_YEAR)
                    .map((y) => (
                      <option key={y} value={y}>
                        {y} - aujourd'hui ({CURRENT_YEAR - y} ans)
                      </option>
                    ))}
                </select>
              </div>
            </>
          )}

          {/* Résultats */}
          {result && (
            <div className="rounded-lg bg-muted/50 border border-btc-orange/20 p-5 space-y-5">
              {/* Résumé chiffres clés */}
              <div className="flex items-center gap-2 text-btc-orange mb-1">
                <TrendingUp className="w-5 h-5" />
                <span className="font-mono text-sm uppercase tracking-wider">
                  Résultat
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground text-xs mb-1">Total investi</p>
                  <p className="text-lg font-bold text-foreground font-mono">
                    {formatEur(result.totalInvested)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs mb-1">BTC accumulés</p>
                  <p className="text-lg font-bold text-foreground font-mono">
                    {result.btcAccumulated < 0.001
                      ? result.btcAccumulated.toFixed(6)
                      : result.btcAccumulated < 0.1
                      ? result.btcAccumulated.toFixed(4)
                      : result.btcAccumulated.toFixed(3)}{" "}
                    ₿
                  </p>
                </div>
              </div>

              {/* Valeur Bitcoin en grand */}
              <div className="rounded-md bg-btc-orange/10 border border-btc-orange/20 px-4 py-3 text-center">
                <p className="text-muted-foreground text-xs mb-1">
                  Valeur Bitcoin aujourd'hui
                </p>
                <p className="text-3xl font-bold text-gradient-btc font-mono">
                  {formatEur(result.btcValue)}
                </p>
              </div>

              {/* Comparaison */}
              <div className="border-t border-border/50 pt-4 space-y-4">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Comparaison vs alternatives
                </p>

                <CompBar
                  emoji="₿"
                  label="Bitcoin"
                  value={result.btcValue}
                  ratio={result.btcValue / result.totalInvested}
                  maxValue={maxValue}
                  textClass="text-btc-orange"
                  barClass="bg-btc-orange"
                />
                <CompBar
                  emoji="🥇"
                  label="Or"
                  value={result.goldValue}
                  ratio={result.goldValue / result.totalInvested}
                  maxValue={maxValue}
                  textClass="text-yellow-400"
                  barClass="bg-yellow-400"
                />
                <CompBar
                  emoji="🏦"
                  label="Épargne (2 %/an)"
                  value={result.savingsValue}
                  ratio={result.savingsValue / result.totalInvested}
                  maxValue={maxValue}
                  textClass="text-blue-400"
                  barClass="bg-blue-400"
                />
              </div>
            </div>
          )}

          <p className="text-muted-foreground text-xs text-center leading-relaxed">
            Simulation indicative basée sur des prix historiques approximatifs (USD ≈ EUR). Les performances passées ne présagent pas des performances futures. Ce n'est pas un conseil financier.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BitcoinCalculator;
