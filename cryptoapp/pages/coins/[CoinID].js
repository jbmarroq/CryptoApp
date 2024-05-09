import { GECKO_API_KEY } from "@/Config/CoinGeckoAPI";

import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import { SyncChart } from "@/Components/SyncChart";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function cleanText(text) {
  // Remove HTML tags
  const cleanedText = text.replace(/<[^>]+>/g, "");
  // Replace special characters
  const cleanedTextWithoutSpecialChars = cleanedText.replace(/&[^\s]*;/g, "");
  // Trim excess whitespace
  const finalText = cleanedTextWithoutSpecialChars.trim();
  return finalText;
}

export default function CoinDetails() {
  const router = useRouter();
  const { CoinID } = router.query;
  console.log("router query", router.query);

  const aud = "aud";
  const fetcher = (...args) =>
    fetch(...args, {
      method: "GET",
      headers: {
        "x-cg-demo-api-key": GECKO_API_KEY,
      },
    }).then((res) => res.json());

  const URL = `https://api.coingecko.com/api/v3/coins/${CoinID}?localization=true&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`;

  const { data: coinInfo, error } = useSWR(CoinID ? URL : null, fetcher);
  console.log("coin Details:", coinInfo);

  if (!coinInfo && !error) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">Error: {error}</div>;

  return (
    <>
      <div className="p-1">
        <Link href={"/coins"}>
          <button className="bg-transparent shadow-xl p-2 rounded-full hover:bg-slate-900 text-slate-700  hover:text-white py-2 px-4 border border-slate-300 hover:border-transparent rounded dark:border-stone-700 dark:text-stone-500">
            Back To Coins
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-1">
        <div className="bg-slate-100 col-span-1 border rounded-md p-4  dark:border-stone-700 dark:bg-slate-950">
          <div className="flex flex-col items-center justify-center">
            <img
              className="shadow-lg p-2 rounded-full"
              src={coinInfo?.image.large}
              alt={coinInfo?.name}
              height="100"
              style={{ marginBottom: 20 }}
            />
            <h1 className="scroll-m-20  pb-2 text-2xl md:text-4xl font-semibold tracking-tight first:mt-0 ">
              {coinInfo?.name}
            </h1>
            <p className="scroll-m-20 text-stone-500 border-b pb-2 text-sm md:text-md  tracking-tight first:mt-0 dark:border-stone-700">
              Genesis Date:{" "}
              {coinInfo.genesis_date != null ? coinInfo.genesis_date : "N/A"}
            </p>
          </div>

          <div className="mb-4">
            <p className="flex items-center">
              <span className="text-md md:text-xl  font-semibold">Rank:</span>
              <span className="text-md md:text-xl  ml-2 ">
                {numberWithCommas(coinInfo?.market_data.market_cap_rank)}
              </span>
            </p>
            <p className="flex items-center">
              <span className="text-md md:text-xl font-semibold">
                Current Price:
              </span>
              <span className="text-md md:text-xl ml-2">
                AU${" "}
                {numberWithCommas(
                  coinInfo?.market_data.current_price.aud.toFixed(2)
                )}
              </span>
            </p>
            <p className="flex items-center">
              <span className="text-md md:text-xl font-semibold">
                Market Cap:
              </span>
              <span className="text-md md:text-xl ml-2">
                AU${" "}
                {numberWithCommas(
                  coinInfo?.market_data.market_cap.aud.toFixed(2)
                )}{" "}
                M
              </span>
            </p>
          </div>
          <p className="text-secondary text-justify dark:text-stone-400">
            {cleanText(coinInfo?.description.en)}
          </p>
          <div></div>
        </div>
        <div className="col-span-2">
          Add buttons for fetching at 24;1
          <SyncChart />
        </div>
      </div>
    </>
  );
}

// export const getServerSideProps = async ({ params }) => {
//   const { filmID } = params;
//   const url = `https://api.coingecko.com/api/v3/coins/${coinId}?localization=true&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`;
//   const data = await fetcher(url);
//   console.log("InitialDATA : ", data);

//   return {
//     props: {
//       initialData: data,
//     },
//   };
// };
