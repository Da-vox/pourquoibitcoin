import { useEffect, useState } from "react";

export const useBtc7DayLow = () => {
  const [lowPrice, setLowPrice] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7"
    )
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        const prices: number[] = (json.prices ?? []).map(
          ([, price]: [number, number]) => price
        );
        if (prices.length === 0) return;
        // Round DOWN to the nearest thousand so "plus de X $" stays true.
        const rounded = Math.floor(Math.min(...prices) / 1000) * 1000;
        setLowPrice(rounded);
      })
      .catch(() => {
        /* keep null, caller falls back */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return lowPrice;
};
