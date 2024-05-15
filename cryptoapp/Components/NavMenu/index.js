import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  //   NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  //   NavigationMenuViewport,
} from "../ui/navigation-menu";
import Link from "next/link";
const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return React.createElement(
      "li",
      null,
      React.createElement(
        NavigationMenuLink,
        { asChild: true },
        React.createElement(
          "a",
          {
            ref: ref,
            className: cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            ),
            ...props,
          },
          React.createElement(
            "div",
            { className: "text-sm font-medium leading-none" },
            title
          ),
          React.createElement(
            "p",
            {
              className:
                "line-clamp-2 text-sm leading-snug text-muted-foreground",
            },
            children
          )
        )
      )
    );
  }
);
ListItem.displayName = "ListItem";

const elements = [
  {
    title: "Top gainers",
    href: "",
    description:
      "Track the largest gainers based on price movements in the last 24 hours.",
  },
  {
    title: "Top Losers",
    href: "",
    description:
      "Uncover the largest losers based on price movements in the last 24 hours.",
  },
  {
    title: "Recently added",
    href: "/docs/primitives/progress",
    description:
      "Discover new cryptocurrencies that were recently added to CoinGecko API.",
  },
  {
    title: "Trending",
    href: "",
    description:
      "This list is sorted by coins that are most searched for in the last 3 hours.",
  },
];

export function NavMenu() {
  return (
    <NavigationMenu className="flex items-center gap-4 text-sm lg:gap-6 mr-4 hidden md:flex  ml-auto">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent dark:bg-transparent">
            Coins
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {elements.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent dark:bg-transparent">
            Analytics
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Forecast</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent dark:bg-transparent">
            NFTs
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent dark:bg-transparent">
            Resources
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem> */}
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent dark:bg-transparent">
            Item Five
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem> */}
        {/* <NavigationMenuItem> */}
        {/* <Link href=""> */}
        {/* <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Documentation
          </NavigationMenuLink> */}
        {/* </Link> */}
        {/* </NavigationMenuItem> */}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
