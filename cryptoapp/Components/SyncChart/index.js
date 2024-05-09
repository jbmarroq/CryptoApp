import useSWR from "swr";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GECKO_API_KEY } from "@/Config/CoinGeckoAPI";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
  AreaChart,
  Area,
  Skeleton,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { mutate } from "swr";

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  const hours = `${date.getHours()}`.padStart(2, "0");
  const minutes = `${date.getMinutes()}`.padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export function SyncChart() {
  const [days, setDays] = useState(1);
  const [chartData, setChartData] = useState([]);
  const [didUpdateChartData, setDidUpdateChartData] = useState(false);
  const [didUpdateAgain, setDidUpdateAgain] = useState(false);

  const router = useRouter();
  const { CoinID } = router.query;
  const aud = "aud";
  const fetcher = (...args) =>
    fetch(...args, {
      method: "GET",
      headers: {
        "x-cg-demo-api-key": GECKO_API_KEY,
      },
    }).then((res) => res.json());

  const URL = `https://api.coingecko.com/api/v3/coins/${CoinID}/market_chart?vs_currency=${aud}&days=${days}`;

  const { data: coinHistory, error, isLoading } = useSWR(URL, fetcher);

  console.log("CoinHistory : ", coinHistory);
  // console.log(error);
  useEffect(() => {
    if (coinHistory && coinHistory.prices) {
      setChartData(
        (prevData) =>
          [
            ...prevData,
            ...coinHistory?.prices.map((priceData, index) => ({
              date: formatDate(priceData[0]),
              price: priceData[1],
              marketCaps: coinHistory.market_caps[index][1],
              totalVolumes: coinHistory.total_volumes[index][1],
            })),
          ].sort((a, b) => new Date(a.date) - new Date(b.date)) ///datapoints are concatenated need to sort by datetime
      );
    }
  }, [coinHistory]);
  const handleClick = (days) => {
    setDays(days);
    mutate(URL, undefined, false); // Revalidate the data
  };

  if (error) return <div>Failed to load coinHistory</div>;
  if (isLoading) return;
  <div
    style={{ border: "1px solid pink", padding: "10px", borderRadius: "5px" }}
  >
    Loading...
    {/* <Skeleton
      sx={{ bgcolor: "grey.700" }}
      animation="wave"
      variant="rounded"
      width="100%"
      height={250}
    />
    <Skeleton
      sx={{ bgcolor: "grey.800" }}
      animation="wave"
      variant="rounded"
      width="100%"
      height={250}
    />
    <Skeleton
      sx={{ bgcolor: "grey.700" }}
      animation="wave"
      variant="rounded"
      width="100%"
      height={250}
    /> */}
  </div>;

  //   const handleBrushChange = (value) => {
  //     const { startIndex, endIndex } = value;

  //     console.log("currentIndex", startIndex);
  //     console.log("endIndex", endIndex);
  //     if (startIndex >= 2136 && !didUpdateAgain) {
  //       //assuming fetch returns 365 datapoints
  //       setDays(1);
  //       mutate(
  //         URL,
  //         (prevData) => {
  //           const newData = prevData.prices.map((priceData, index) => ({
  //             date: formatDate(priceData[0]),
  //             price: priceData[1],
  //             marketCaps: prevData.market_caps[index][1],
  //             totalVolumes: prevData.total_volumes[index][1],
  //           }));
  //           setDidUpdateAgain(true);
  //           return [...chartData, ...newData];
  //         },
  //         false
  //       ); // Don't revalidate the data
  //     } else if (startIndex >= 275 && !didUpdateChartData) {
  //       //assuming fetch returns 365 datapoints
  //       setDays(90);
  //       mutate(
  //         URL,
  //         (prevData) => {
  //           //data for 365days
  //           const newData = prevData.prices.map((priceData, index) => ({
  //             //data plus 90days-Note some days are repeated, hence the sorting afterwards
  //             date: formatDate(priceData[0]),
  //             price: priceData[1],
  //             marketCaps: prevData.market_caps[index][1],
  //             totalVolumes: prevData.total_volumes[index][1],
  //           }));
  //           console.log("NewDATA : ", newData);
  //           setDidUpdateChartData(true);
  //           return [...chartData, ...newData];
  //         },
  //         false
  //       );
  //     }
  //   };

  console.log("DisplayedData:", chartData);
  return (
    <div
      className="border bg-slate-100 dark:border dark:border-stone-700 dark:bg-slate-950 rounded-md p-4  "
      //   style={{ border: "1px solid pink", padding: "10px", borderRadius: "5px" }}
    >
      <div className="flex justify-between w-full mb-4">
        <button
          className="flex-grow bg-stone-200 shadow-md hover:bg-slate-900 text-slate-700  hover:text-white py-0  border-2 border-stone-400 hover:border-transparent dark:border-stone-700 dark:text-stone-500"
          onClick={() => handleClick(1)}
        >
          24h
        </button>
        <div className="w-4"></div>
        <button
          className="flex-grow bg-stone-200 bg-transparent shadow-sm   hover:bg-slate-900 text-slate-700  hover:text-white border border-stone-400 hover:border-transparent  dark:border-stone-700 dark:text-stone-500"
          onClick={() => handleClick(7)}
        >
          7d
        </button>
        <div className="w-4"></div>
        <button
          className="flex-grow bg-stone-200 bg-transparent  shadow-md  hover:bg-slate-900 text-slate-700 border-2 hover:text-white border  border-stone-400 hover:border-transparent  dark:border-stone-700 dark:text-stone-500"
          onClick={() => handleClick(30)}
        >
          1m
        </button>
        <div className="w-4"></div>
        <button
          className="flex-grow bg-stone-200 bg-transparent shadow-md   hover:bg-slate-900 text-slate-700  border hover:text-white border border-stone-400 hover:border-transparent  dark:border-stone-700 dark:text-stone-500"
          onClick={() => handleClick(365)}
        >
          1y
        </button>
      </div>
      <h1 className="text-yellow-500">Price (AU$)</h1>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={500}
          height={200}
          data={chartData}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 30,
            bottom: 0,
          }}
        >
          <Brush
            dataKey="date"
            height={25}
            startIndex={15}
            travellerWidth={7}
            // stroke="gray"
            // fill="lightgray"
            gap={1}
            // x={value}
            // onChange={(brush) => handleBrushChange(brush)}
            // onChange={handleSliderChange}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            tickFormatter={(value) =>
              value.toLocaleString("en", {
                notation: "compact",
              })
            }
          />
          <Tooltip
            labelStyle={{
              color: "black",
            }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="orange"
            fill="#8884d8"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <h1 className="text-yellow-500">Market Caps (AU$)</h1>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={500}
          height={200}
          data={chartData}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 30,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            tickFormatter={(value) =>
              value.toLocaleString("en", {
                notation: "compact",
                compactDisplay: "short",
              })
            }
          />
          {/* domain={[0, "auto"]} */}
          <Tooltip labelStyle={{ color: "black" }} />

          <Line
            type="monotone"
            dataKey="marketCaps"
            stroke="green"
            fill="#82ca9d"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <h1 className="text-yellow-500">Total Volume (AU$)</h1>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          width={500}
          height={200}
          data={chartData}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 30,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            tickFormatter={(value) =>
              value.toLocaleString("en", {
                notation: "compact",
                compactDisplay: "short",
              })
            }
          />
          <Tooltip labelStyle={{ color: "black" }} />
          <Area
            type="monotone"
            dataKey="totalVolumes"
            stroke="magenta"
            fill="purple"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}