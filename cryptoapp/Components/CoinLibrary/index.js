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

export function CoinLibrary({}) {
  return (
    <>
      {/* <div> */}
      {/* className="container flex h-14 max-w-screen-2xl items-center" */}
      <div className="sticky top-0 z-50 w-full border-transparent bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center items-center dark:border-transparent">
        <NavMenu />
        <ModeToggle />
      </div>
      {/* </div> */}
      <Container>
        {/* <Typography
          variant="h4"
          style={{ marginTop: 20, justifyContent: "center", display: "flex" }}
        >
          🔥🚀📈Trending Coins📉🥶⚰️
        </Typography> */}

        <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 dark:border-stone-700">
          Trending Coins
        </h1>
      </Container>
      {/* <MultiCarousel /> */}
      <EmblaCarousel />
      <Container>
        {/* <CoinsTable /> */}
        <CoinsDataTable />
      </Container>
    </>
  );
}
