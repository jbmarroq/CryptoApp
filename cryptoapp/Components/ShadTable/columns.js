import { ColumnDef } from "@tanstack/react-table";

// Define your own column definition type
// export  ColumnDef = {
//   accessorKey: string;
//   header: string;
// };

export const columns = [
  {
    accessorKey: "image",
    header: "_",
    cell: (data) => (
      <div>
        <img
          src={data.image}
          alt={`${data.image} Ticker`}
          width={50}
          height={50}
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Coin",
  },
  {
    accessorKey: "current_price",
    header: "Price",
  },
  {
    accessorKey: "price_change_percentage_24h",
    header: "24h Change",
  },
  {
    accessorKey: "total_volume",
    header: "24h Volume",
  },
  {
    accessorKey: "market_cap",
    header: "Market Cap",
  },
  {
    accessorKey: "sparkline_in_7d.price",
    header: "7D Sparkline",
  },
];
