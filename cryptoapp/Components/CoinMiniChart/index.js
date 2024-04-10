import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function MiniChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={300}
        height={100}
        data={coin.sparkline_in_7d.price.map((price) => price[0])}
      >
        <Line
          type="monotone"
          dataKey="price"
          stroke="#8884d8"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
