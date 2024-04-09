import useSWR from "swr";
import Stack from "@mui/material/Stack";
import { LineChart } from "@mui/x-charts/LineChart";

import { GECKO_API_KEY } from "@/Config/CoinGeckoAPI";
import { useState } from "react";

const data = [4000, 3000, 2000, null, 1890, 2390, 3490];
const xData = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString(); // Adjust the format as needed
};

function LineChartConnectNulls() {
  const [historicData, setHistoricData] = useState();
  const aud = "aud";
  const fetcher = (...args) =>
    fetch(...args, {
      method: "GET",
      headers: {
        "x-cg-demo-api-key": GECKO_API_KEY,
      },
    }).then((res) => res.json());

  const URL = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${aud}&days=365`;

  const { data: coinHistory, error } = useSWR(URL, fetcher);

  console.log("CoinHistory : ", coinHistory);
  console.log(error);
  if (error) return <div>Failed to load coinHistorys</div>;
  if (!coinHistory) return <div>Loading...</div>;

  return (
    // <Stack sx={{ width: "100%" }}>
    <>
      {/* <LineChart
        xAxis={[{ data: xData, scaleType: "point" }]}
        series={[{ data, showMark: false }]}
        height={200}
        margin={{ top: 10, bottom: 20 }}
      />
      <LineChart
        xAxis={[{ data: xData, scaleType: "point" }]}
        series={[{ data, connectNulls: true }]}
        height={200}
        margin={{ top: 10, bottom: 20 }}
      /> */}
      <LineChart
        xAxis={[
          {
            data: coinHistory.prices.map((price) => price[0]),
            scaleType: "time",
            valueFormatter: (date) => formatDate(date),
          },
        ]} // Convert timestamps to formatted date strings
        series={[
          {
            id: "Bitcoin",
            label: "price AU$",
            data: coinHistory.prices.map((price) => price[1]),
            showMark: false,
          },
        ]} // Pass entire data array for y-axis
        // margin={{ top: 5, bottom: 20 }}
        height={400}
      />
      <LineChart
        xAxis={[
          {
            data: coinHistory.prices.map((price) => price[0]),
            scaleType: "time",
            valueFormatter: (date) => formatDate(date),
          },
        ]} // Convert timestamps to formatted date strings
        series={[
          {
            id: "Bitcoin",
            label: "Market Cap AU$",
            data: coinHistory.market_caps.map((price) => price[1]),
            showMark: false,
          },
        ]} // Pass entire data array for y-axis
        // margin={{ top: 5, bottom: 20 }}
        height={400}
      />
      <LineChart
        xAxis={[
          {
            data: coinHistory.prices.map((price) => price[0]),
            scaleType: "time",
            valueFormatter: (date) => formatDate(date),
          },
        ]} // Convert timestamps to formatted date strings
        series={[
          {
            id: "Bitcoin",
            label: "Total Volume AU$",
            data: coinHistory.total_volumes.map((price) => price[1]),
            showMark: false,
          },
        ]} // Pass entire data array for y-axis
        // margin={{ top: 5, bottom: 20 }}
        height={400}
      />
    </>
    // </Stack>
  );
}
