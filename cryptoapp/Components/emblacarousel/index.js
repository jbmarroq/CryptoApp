import useSWR from "swr";
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { GECKO_API_KEY } from "@/Config/CoinGeckoAPI";

export function EmblaCarousel() {
  const aud = "aud";
  const fetcher = (...args) =>
    fetch(...args, {
      method: "GET",
      headers: {
        "x-cg-demo-api-key": GECKO_API_KEY,
      },
    }).then((res) => res.json());

  const URL = `https://api.coingecko.com/api/v3/search/trending`;

  const { data: trendingCoinsData, error, mutate } = useSWR(URL, fetcher);

  console.log("TrendingCoinsData : ", trendingCoinsData);
  if (error) return <div>Failed to load coins</div>;
  if (!trendingCoinsData) return <div>Loading...</div>;

  const coinsToDisplay = trendingCoinsData.coins;

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
        containScroll: "trimSnaps",
        speed: 10,
        dragFree: false,
        slidesInView: 9,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
          stopOnInteraction: false,
        }),
      ]}
      className="flex w-full"
    >
      <CarouselContent className="flex justify-between ">
        {coinsToDisplay.map((coin, index) => (
          <CarouselItem
            key={index}
            className="basis-1/7" //sm:basis-1/3 md:basis-1/5 lg:basis-1/7 xl:basis-1/9 2xl: basis-1/11 sm:pl-2 md:pl-4
          >
            <div className="p-5">
              <Card className="bg-slate-100 dark:bg-slate-950 dark:border-stone-700">
                <CardContent className="flex aspect-rectangular items-center justify-center p-1">
                  {/* flex aspect-rectangular items-center justify-center p-1 */}
                  <img
                    src={coin.item.large}
                    alt={coin.item.name}
                    className="hover:bg-white shadow-lg transition-all  hover:scale-110 p-2 rounded-full mr-1 "
                    height={100}
                    width={100}
                  />
                  <div className="text-center mr-3 text-sm tracking-tight">
                    <p>{coin.item.symbol.toUpperCase()}</p>

                    <p
                      style={{
                        color:
                          coin.item.data.price_change_percentage_24h.aud !=
                            null &&
                          coin.item.data.price_change_percentage_24h.aud >= 0
                            ? "green"
                            : "red",
                      }}
                    >
                      {coin.item.data.price_change_percentage_24h.aud.toFixed(
                        2
                      )}
                      %
                    </p>
                    <p>AU${coin.item.data.price.toFixed(2)}</p>
                  </div>
                  <div className="items-center mr-3 ">
                    <img
                      src={coin.item.data.sparkline}
                      alt={`${coin.item.data.sparkline}`}
                      height={50}
                      width={80}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-5 top-1/2 transform -translate-y-1/2 z-10" />
      <CarouselNext className="absolute right-5 top-1/2 transform -translate-y-1/2 z-10" />
    </Carousel>
  );
}
