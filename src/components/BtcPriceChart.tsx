import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TIME_FILTERS = [
  { label: "24h", days: 1 },
  { label: "1S", days: 7 },
  { label: "1A", days: 365 },
  { label: "2A", days: 730 },
  { label: "4A", days: 1460 },
] as const;

interface PricePoint {
  date: string;
  price: number;
}

const formatPrice = (value: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const formatDate = (timestampMs: number, days: number) =>
  new Date(timestampMs).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    ...(days > 30 ? { year: "2-digit" } : {}),
  });

const fetchBtcPrices = async (days: number): Promise<PricePoint[]> => {
  // CoinGecko's free tier caps market_chart at 365 days, so use
  // CryptoCompare's histoday endpoint for longer ranges.
  if (days > 365) {
    const res = await fetch(
      `https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=${days}`
    );
    if (!res.ok) throw new Error("API error");
    const json = await res.json();
    if (json.Response !== "Success") throw new Error("API error");
    const prices = (json.Data.Data as { time: number; close: number }[]).map(
      (d) => ({
        date: formatDate(d.time * 1000, days),
        price: Math.round(d.close),
      })
    );
    const step = Math.max(1, Math.floor(prices.length / 200));
    return prices.filter((_, i) => i % step === 0);
  }

  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}`
  );
  if (!res.ok) throw new Error("API error");
  const json = await res.json();
  const prices = (json.prices as [number, number][]).map(
    ([timestamp, price]) => ({
      date: formatDate(timestamp, days),
      price: Math.round(price),
    })
  );
  const step = Math.max(1, Math.floor(prices.length / 200));
  return prices.filter((_, i) => i % step === 0);
};

const BtcPriceChart = () => {
  const [activeFilter, setActiveFilter] = useState(1);
  const days = TIME_FILTERS[activeFilter].days;

  const {
    data = [],
    isPending: loading,
    isError: error,
  } = useQuery({
    queryKey: ["btc-prices", days],
    queryFn: () => fetchBtcPrices(days),
    staleTime: days === 1 ? 60 * 1000 : 5 * 60 * 1000,
  });

  const currentPrice = data.length > 0 ? data[data.length - 1].price : null;
  const priceChange =
    data.length > 1 ? data[data.length - 1].price - data[0].price : 0;
  const priceChangePercent =
    data.length > 1
      ? ((priceChange / data[0].price) * 100).toFixed(2)
      : "0.00";
  const isPositive = priceChange >= 0;

  return (
    <section className="py-14 md:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-6 md:mb-10">
          <p className="font-mono text-sm tracking-[0.3em] uppercase text-btc-orange mb-4">
            Cours en direct
          </p>
          {currentPrice && (
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-3">
              {formatPrice(currentPrice)}
            </h2>
          )}
          {data.length > 1 && (
            <p
              className={`text-lg font-semibold ${
                isPositive ? "text-green-400" : "text-red-400"
              }`}
            >
              {isPositive ? "+" : ""}
              {formatPrice(priceChange)} ({isPositive ? "+" : ""}
              {priceChangePercent}%)
            </p>
          )}
        </div>

        {/* Time Filters */}
        <div
          role="tablist"
          aria-label="Plage temporelle du cours"
          className="flex justify-center gap-2 mb-8"
        >
          {TIME_FILTERS.map((filter, i) => (
            <button
              key={filter.label}
              role="tab"
              type="button"
              aria-selected={activeFilter === i}
              aria-controls="btc-price-chart"
              onClick={() => setActiveFilter(i)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeFilter === i
                  ? "bg-gradient-btc text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div
          id="btc-price-chart"
          role="tabpanel"
          aria-live="polite"
          aria-busy={loading}
          aria-label={`Évolution du cours du bitcoin sur ${TIME_FILTERS[activeFilter].label}`}
          className="rounded-2xl border border-border bg-card p-4 md:p-8"
        >
          {loading ? (
            <div className="h-[350px] flex items-center justify-center text-muted-foreground">
              Chargement…
            </div>
          ) : error ? (
            <div className="h-[350px] flex items-center justify-center text-muted-foreground">
              Impossible de charger le cours. Réessaie plus tard.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="btcGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="hsl(30 100% 50%)"
                      stopOpacity={0.4}
                    />
                    <stop
                      offset="100%"
                      stopColor="hsl(30 100% 50%)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  stroke="hsl(220 15% 35%)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  interval="preserveStartEnd"
                  minTickGap={60}
                />
                <YAxis
                  stroke="hsl(220 15% 35%)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                  domain={["auto", "auto"]}
                  width={60}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(220 25% 12%)",
                    border: "1px solid hsl(220 25% 18%)",
                    borderRadius: "0.5rem",
                    color: "hsl(35 100% 95%)",
                    fontSize: 14,
                  }}
                  formatter={(value: number) => [formatPrice(value), "BTC"]}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="hsl(30 100% 50%)"
                  strokeWidth={2}
                  fill="url(#btcGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </section>
  );
};

export default BtcPriceChart;
