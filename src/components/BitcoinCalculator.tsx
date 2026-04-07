import { useState, useMemo } from "react";
import { Calculator, TrendingUp } from "lucide-react";

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

const CURRENT_BTC_PRICE = 105000;

const years = Object.keys(BTC_PRICES)
  .map(Number)
  .sort((a, b) => a - b);

const BitcoinCalculator = () => {
  const [amount, setAmount] = useState(100);
  const [year, setYear] = useState(2015);

  const result = useMemo(() => {
    const priceAtYear = BTC_PRICES[year];
    if (!priceAtYear) return null;
    const btcBought = amount / priceAtYear;
    const currentValue = btcBought * CURRENT_BTC_PRICE;
    const multiplier = currentValue / amount;
    return { btcBought, currentValue, multiplier };
  }, [amount, year]);

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-mono text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Simulateur
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-display">
            <span className="text-gradient-btc">Calculateur</span> Bitcoin
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Combien vaudraient tes euros si tu les avais investis dans Bitcoin ?
          </p>
        </div>

        <div className="max-w-lg mx-auto rounded-xl glass-card p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Montant investi (€)
            </label>
            <input
              type="number"
              min={1}
              value={amount}
              onChange={(e) => setAmount(Math.max(1, Number(e.target.value)))}
              className="w-full rounded-lg bg-muted border border-border px-4 py-3 text-foreground text-lg font-mono focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Année d'investissement
            </label>
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full rounded-lg bg-muted border border-border px-4 py-3 text-foreground text-lg font-mono focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {result && (
            <div className="rounded-lg bg-muted/50 border border-primary/20 p-6 space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <TrendingUp className="w-5 h-5" />
                <span className="font-mono text-sm uppercase tracking-wider">
                  Résultat
                </span>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">
                  {amount} € investis en {year} auraient acheté
                </p>
                <p className="text-2xl font-bold text-foreground font-mono">
                  {result.btcBought.toFixed(4)} BTC
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">
                  Valeur aujourd'hui
                </p>
                <p className="text-3xl font-bold text-gradient-btc font-mono">
                  {result.currentValue.toLocaleString("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                    maximumFractionDigits: 0,
                  })}
                </p>
              </div>
              <p className="text-primary font-semibold text-lg">
                × {result.multiplier.toLocaleString("fr-FR", { maximumFractionDigits: 0 })}
              </p>
            </div>
          )}

          <p className="text-muted-foreground text-xs text-center">
            Simulation indicative basée sur les prix historiques approximatifs du BTC.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BitcoinCalculator;
