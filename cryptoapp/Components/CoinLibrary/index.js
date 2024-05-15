// import { useState, useEffect } from "react";
// import { CoinRow } from "../CoinRow";

import { CoinsTable } from "../CoinTable/CoinTable";
import { GECKO_API_KEY } from "@/Config/CoinGeckoAPI";

// import AddToQueueIcon from "@mui/icons-material/AddToQueue";

import { useRouter } from "next/router";
import { Container, Typography, Box } from "@mui/material";
import { SyncChart } from "../CoinChart";

// import { MultiCarousel } from "../MultiCarousel";
import { EmblaCarousel } from "../emblacarousel";
import { CoinsDataTable } from "../ShadTable";
import { NavMenu } from "../NavMenu";
import { ModeToggle } from "../ToggleMode/ModeToggle";
import { MenuBar } from "../Menubar";

export function CoinLibrary({}) {
  return (
    <>
      <div className="sticky top-0 z-50 w-full border-transparent bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60  flex flex-wrap items-center justify-between dark:border-transparent p-4 md:px-6">
        <NavMenu />
        <MenuBar />
        <ModeToggle />
      </div>
      {/* </div> */}

      <div className="max-w-7xl mx-auto px-0 sm:px-0 lg:px-8">
        <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 dark:border-stone-700">
          Trending Coins
        </h1>

        <EmblaCarousel />

        <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 dark:border-stone-700 text-center p-10">
          Cryptocurrency Prices by Market Cap
        </h1>

        <CoinsDataTable />
      </div>
    </>
  );
}
