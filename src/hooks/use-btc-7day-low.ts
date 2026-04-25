import { useQuery } from "@tanstack/react-query";

const fetchBtc7DayLow = async (): Promise<number | null> => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7"
  );
  if (!res.ok) throw new Error("API error");
  const json = await res.json();
  const prices: number[] = (json.prices ?? []).map(
    ([, price]: [number, number]) => price
  );
  if (prices.length === 0) return null;
  // Round DOWN to the nearest thousand so "plus de X $" stays true.
  return Math.floor(Math.min(...prices) / 1000) * 1000;
};

export const useBtc7DayLow = () => {
  const { data } = useQuery({
    queryKey: ["btc-7day-low"],
    queryFn: fetchBtc7DayLow,
    staleTime: 10 * 60 * 1000,
  });

  return data ?? null;
};
