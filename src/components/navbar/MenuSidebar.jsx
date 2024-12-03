"use client";
import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { DashboardIcon } from "@radix-ui/react-icons";
import { MenuIcon, Settings } from "lucide-react/dist/cjs/lucide-react";
import Link from "next/link";

export function SheetSide() {
  return (
    <div className="">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="flex rounded-full size-8 border bg-white border-primary shadow-none text-black">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side={"right"} className="px-0 rounded-sm">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-center text-primary">
              <Settings />
            </SheetTitle>
            <SheetDescription>Explore all the menu from here</SheetDescription>
          </SheetHeader>

          {/* Main Content */}
          <div className="mt-6">
            <Link
              href="/dashboard"
              className="flex items-center gap-4 py-2 px-4 border border-secondary w-full"
            >
              <DashboardIcon />
              <span>Dashboard</span>
            </Link>
          </div>
          <SheetFooter>
            {/* <SheetClose asChild>
              <Button className="flex absolute -left-12 rounded-r-none -z-0 shadow-none top-5">
                <Sliders />
              </Button>
            </SheetClose> */}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
