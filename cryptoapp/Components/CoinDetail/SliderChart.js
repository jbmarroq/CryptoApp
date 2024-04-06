import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import { ScatterChart } from "@mui/x-charts/ScatterChart";
import useSWR from "swr";
import Stack from "@mui/material/Stack";
import { LineChart } from "@mui/x-charts/LineChart";

import { GECKO_API_KEY } from "@/Config/CoinGeckoAPI";
import { useState } from "react";

const minDistance = 1;

const endDate = new Date(); // Today's date
const startDate = new Date(new Date().setDate(endDate.getDate() - 365)); //date 364 days ago

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString(); // Adjust the format as needed
};

export function MinMaxExample() {
  const [value, setValue] = useState([startDate.getTime(), endDate.getTime()]); // Value for Slider

  const aud = "aud";
  const fetcher = (...args) =>
    fetch(...args, {
      method: "GET",
      headers: {
        "x-cg-demo-api-key": GECKO_API_KEY,
      },
    }).then((res) => res.json());

  const URL = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${aud}&days=365`;

  const { data: coinHistory, error, isLoading } = useSWR(URL, fetcher);

  //   console.log("CoinHistory : ", coinHistory);
  //   console.log(error);

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(
          newValue[0],
          endDate.getTime() - minDistance * 24 * 60 * 60 * 1000
        ); // Ensure the minimum distance from the end date
        setValue([clamped, clamped + minDistance * 24 * 60 * 60 * 1000]);
      } else {
        const clamped = Math.max(
          newValue[1],
          startDate.getTime() + minDistance * 24 * 60 * 60 * 1000
        ); // Ensure the minimum distance from the start date
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue);
    }
  };
  if (error) return <div>Failed to load coinHistorys</div>;
  if (isLoading) return <div>Loading...</div>;

  const filteredData = coinHistory.prices.filter((price) => {
    const priceDate = new Date(price[0]);
    return priceDate >= new Date(value[0]) && priceDate <= new Date(value[1]);
  });

  return (
    <Box sx={{ width: "100%", maxWidth: 800 }}>
      {/* <ScatterChart
        xAxis={[
          {
            label: "x",
            min: value[0],
            max: value[1],
          },
        ]}
        series={[{ data }]}
        height={300}
        margin={{ top: 10 }}
      /> */}
      <LineChart
        xAxis={[
          {
            data: filteredData.map((price) => price[0]),
            scaleType: "time",
            valueFormatter: (date) => formatDate(date),
          },
        ]} // Convert timestamps to formatted date strings
        series={[
          {
            id: "Bitcoin",
            label: "price AU$",
            data: filteredData.map((price) => price[1]),
            showMark: false,
            area: false,
          },
        ]}
        height={400}
      />
      <Slider
        value={value}
        onChange={handleChange}
        // valueLabelDisplay="auto"
        min={startDate.getTime()}
        max={endDate.getTime()}
        // sx={{ mt: 2 }}
      />
    </Box>
  );
}
