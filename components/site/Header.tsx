"use client";

import { Logo } from "@/components/site/Logo";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full flex items-center justify-center">
      <div className="container flex justify-between h-auto max-w-screen-2xl px-10 py-6">
        <Logo size="sm" href="/" />

        <NavigationMenu className="ml-auto">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/"
                  className={cn(pathname === "/" && "nav-selected")}
                >
                  Art
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/coins"
                  className={cn(pathname === "/coins" && "nav-selected")}
                >
                  Coins
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/profile"
                  className={cn(pathname === "/profile" && "nav-selected")}
                >
                  Profile
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
