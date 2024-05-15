// import useSWR from "swr";
// import { GECKO_API_KEY } from "@/Config/CoinGeckoAPI";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Brush,
//   AreaChart,
//   Area,
// } from "recharts";

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];
// const formatDate = (timestamp) => {
//   const date = new Date(timestamp);
//   return date.toLocaleDateString(); // Adjust the format as needed
// };

// export function SyncChart() {
//   const aud = "aud";
//   const fetcher = (...args) =>
//     fetch(...args, {
//       method: "GET",
//       headers: {
//         "x-cg-demo-api-key": GECKO_API_KEY,
//       },
//     }).then((res) => res.json());

//   const URL = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${aud}&days=365`;

//   const { data: coinHistory, error } = useSWR(URL, fetcher);

//   console.log("CoinHistory : ", coinHistory);
//   console.log(error);
//   if (error) return <div>Failed to load coinHistorys</div>;
//   if (!coinHistory) return <div>Loading...</div>;

//   return (
//     <div>
//       <h4>A demo of synchronized AreaCharts</h4>
//       <LineChart
//         width={500}
//         height={200}
//         data={data.prices[]}
//         syncId="anyId"
//         margin={{
//           top: 10,
//           right: 30,
//           left: 0,
//           bottom: 0,
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Line type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
//       </LineChart>
//       <p>Maybe some other content</p>
//       <LineChart
//         width={500}
//         height={200}
//         data={data}
//         syncId="anyId"
//         margin={{
//           top: 10,
//           right: 30,
//           left: 0,
//           bottom: 0,
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Line type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
//       </LineChart>
//       <AreaChart
//         width={500}
//         height={200}
//         data={data}
//         syncId="anyId"
//         margin={{
//           top: 10,
//           right: 30,
//           left: 0,
//           bottom: 0,
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
//         <Brush dataKey="name" height={30} stroke="red" gap={1} />
//       </AreaChart>
//     </div>
//   );
// }

import useSWR from "swr";
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
  Legend,
  ResponsiveContainer,
} from "recharts";

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString(); // Adjust the format as needed
};

export function SynChart() {
  const aud = "aud";
  const fetcher = (...args) =>
    fetch(...args, {
      method: "GET",
      headers: {
        "x-cg-demo-api-key": GECKO_API_KEY,
      },
    }).then((res) => res.json());

  const getKey = (pageIndex, previousPageData) => {
    const daysFromToday = 365 - pageIndex * 30;
    const interval = getDataResolution(daysFromToday);
    return `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${aud}&days=${daysFromToday}&interval=${interval}`;
  };

  const URL = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${aud}&days=365`;

  const { data: coinHistory, error } = useSWR(URL, fetcher);

  console.log("CoinHistory : ", coinHistory);
  console.log(error);
  if (error) return <div>Failed to load coinHistorys</div>;
  if (!coinHistory) return <div>Loading...</div>;

  // Extracting data for the charts
  const chartData = coinHistory.prices.map((priceData) => ({
    date: formatDate(priceData[0]), // Assuming the timestamp is at index 0
    price: priceData[1], // Assuming the price is at index 1
    marketCaps: priceData[(2, 1)], // Assuming market caps is at index 2 and its structure is [timestamp, value]
    totalVolumes: priceData[(3, 1)], // Assuming total volumes is at index 3 and its structure is [timestamp, value]
    // total_volumes: priceData[3],
    // Assuming the price is also used for pv
  }));
  console.log("chartdata:", chartData);
  return (
    <div>
      <h4>A demo of synchronized AreaCharts</h4>
      <ResponsiveContainer>
        <LineChart
          width={500}
          height={200}
          data={chartData}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </LineChart>
      </ResponsiveContainer>

      <p>Maybe some other content</p>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={500}
          height={200}
          data={chartData}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          {/* domain={[0, "auto"]} */}
          <Tooltip />
          <Line
            type="monotone"
            dataKey="marketCaps"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          width={500}
          height={200}
          data={chartData}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="totalVolumes"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Brush dataKey="date" height={30} stroke="red" gap={1} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
// import { useState } from "react";
// import useSWRInfinite from "swr/infinite";
// import { GECKO_API_KEY } from "@/Config/CoinGeckoAPI";
// import useSWR from "swr";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Brush,
//   AreaChart,
//   Area,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const formatDate = (timestamp) => {
//   const date = new Date(timestamp);
//   return date.toLocaleDateString();
// };

// const endDate = new Date(); // Today's date
// const startDate = new Date(new Date().setDate(endDate.getDate() - 365)); //date 364 days ago

// export function SyncChart() {
//   const [value, setValue] = useState([startDate.getTime(), endDate.getTime()]); // Value for Slider
//   const [days, setDays] = useState(365);
//   const [allCoinHistory, setAllCoinHistory] = useState(null);
//   const [optimisticData, setOptimisticData] = useState(null);
//   const aud = "aud";
//   const fetcher = (Url, days = ``) =>
//     fetch(`${Url}${days}`, {
//       method: "GET",
//       headers: {
//         "x-cg-demo-api-key": GECKO_API_KEY,
//       },
//     }).then((res) => res.json());

//   const Url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${aud}&days=${days}`;

//   const {
//     data: coinHistory,
//     error,
//     isLoading,
//   } = useSWR([Url, days], fetcher, {
//     onSuccess: (data) => {
//       setAllCoinHistory(data);
//     },
//   });

//   const chartData =
//     optimisticData ||
//     allCoinHistory.prices.map((priceData) => ({
//       date: formatDate(priceData[0]), // Assuming the timestamp is at index 0
//       price: priceData[1], // Assuming the price is at index 1
//       marketCaps: priceData[(2, 1)], // Assuming market caps is at index 2 and its structure is [timestamp, value]
//       totalVolumes: priceData[(3, 1)], // Assuming total volumes is at index 3 and its structure is [timestamp, value]
//       // total_volumes: priceData[3],
//       // Assuming the price is also used for pv
//     }));
//   const handleSliderChange = () => {
//     if (value >= 275) {
//       // Refetch data for the last 90 days
//       setDays(90);

//       // Create a copy of the previous data
//       setOptimisticData(chartData);

//       mutate(Url, { revalidate: true })
//         .then((newData) => {
//           // Update the optimistic data with the new data
//           setOptimisticData(
//             newData.prices.map((priceData) => ({

//               date: formatDate(priceData[0]), // Assuming the timestamp is at index 0
//               price: priceData[1], // Assuming the price is at index 1
//               marketCaps: priceData[(2, 1)], // Assuming market caps is at index 2 and its structure is [timestamp, value]
//             totalVolumes: priceData[(3, 1)],
//             }))

//           );
//          })
//         .catch((error) => {
//           // Reset the optimistic data to the previous version
//           setOptimisticData(null);
//         });
//     } else if (value >= 2) {
//       // Refetch data for the last 2 days when the slider reaches 90%
//       setDays(2);

//       // Create a copy of the previous data
//       setOptimisticData(chartData);

//       mutate(getKey, { revalidate: true })
//         .then((newData) => {
//           // Update the optimistic data with the new data
//           setOptimisticData(
//             newData.flatMap((page) =>
//               page?.prices.map((priceData) => ({
//                 date: formatDate(priceData[0]),
//                 price: priceData[1],
//                 marketCaps: priceData[2],
//                 totalVolumes: priceData[3],
//                 }))
//               )
//             )
//           });
//         .catch((error) => {
//           // Reset the optimistic data to the previous version
//           setOptimisticData(null);
//           });
//      }
//     }
//   }

//   if (error) return <div>Failed to load coinHistorys</div>;
//   if (!chartData) return <div>Loading...</div>;

//   return (
//     <div style={{ width: "100%" }}>
//       <h1>A demo of synchronized AreaCharts</h1>
//       <ResponsiveContainer width="100%" height={200}>
//         <LineChart
//           width={500}
//           height={200}
//           data={chartData}
//           syncId="anyId"
//           margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="date" />
//           <YAxis />
//           <Tooltip />
//           <Line
//             type="monotone"
//             dataKey="price"
//             stroke="#8884d8"
//             fill="#8884d8"
//           />
//         </LineChart>
//       </ResponsiveContainer>
//       <p>Maybe some other content</p>
//       <ResponsiveContainer width="100%" height={200}>
//         <LineChart
//           width={500}
//           height={200}
//           data={chartData}
//           syncId="anyId"
//           margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="date" />
//           <YAxis />
//           <Tooltip />
//           <Line
//             type="monotone"
//             dataKey="marketCaps"
//             stroke="#82ca9d"
//             fill="#82ca9d"
//           />
//         </LineChart>
//       </ResponsiveContainer>
//       <ResponsiveContainer width="100%" height={200}>
//         <AreaChart
//           width={500}
//           height={200}
//           data={chartData}
//           syncId="anyId"
//           margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="date" />
//           <YAxis />
//           <Tooltip />
//           <Legend/>
//           <Area
//             type="monotone"
//             dataKey="totalVolumes"
//             stroke="#82ca9d"
//             fill="#82ca9d"
//           />
//           <Brush
//             dataKey="date"
//             height={30}
//             stroke="red"
//             gap={1}
//             x={value}
//             onChange={handleSliderChange}
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }
