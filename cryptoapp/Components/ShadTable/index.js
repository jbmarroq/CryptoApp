import { columns } from "./columns";
import { DataTable } from "./DataTable";
import { GECKO_API_KEY } from "@/Config/CoinGeckoAPI";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function formatNumber(number) {
  if (Math.abs(number) >= 1e9) {
    return (number / 1e9).toFixed(2) + " B";
  } else if (Math.abs(number) >= 1e6) {
    return (number / 1e6).toFixed(2) + " M";
  } else {
    return number.toString();
  }
}
const calculateLineColor = (prices) => {
  if (prices.length < 2) return "blue"; // Default color

  const firstPrice = prices[0];
  const lastPrice = prices[prices.length - 1];

  return firstPrice <= lastPrice ? "green" : "red"; // Green for uptrend, red for downtrend
};

export function CoinsDataTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const router = useRouter();

  const handleRowClick = (coinId) => {
    router.push(`/coins/${coinId}`);
  };

  const aud = "aud";
  const fetcher = (...args) =>
    fetch(...args, {
      method: "GET",
      headers: {
        "x-cg-demo-api-key": GECKO_API_KEY,
      },
    }).then((res) => res.json());

  const URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${aud}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h`;

  const { data: topCoins, error } = useSWR(URL, fetcher);

  console.log("TopCoins : ", topCoins);
  console.log(error);
  if (error) return <div>Failed to load Top Coins</div>;
  if (!topCoins) return <div>Loading...</div>;

  const filteredCoins = topCoins?.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const pageCount = Math.ceil((filteredCoins?.length || 0) / 10);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={filteredCoins} />
    </div>
  );
}
