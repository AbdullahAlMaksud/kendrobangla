import { LogOut, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.png";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarTrigger } from "../ui/sidebar";

const Navbar = () => {
  return (
    <nav className="fixed w-full">
      <div className="bg-primary-foreground/90 backdrop-blur-sm shadow-sm shadow-black/20 text-white flex justify-between md:justify-between items-center h-16 px-8 flex-row-reverse">
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild aria-label="User menu">
              <Button className="size-8 bg-white shadow-none border border-primary text-black rounded-full ">
                <User2 />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel asChild>
                <h2 className="">User</h2>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User2 />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Link href="/">
          <Image
            src={logo}
            alt="KendroBangla Logo"
            width={100}
            height={50}
            className="object-cover"
          />
        </Link>

        <div className="hidden md:flex text-primary justify-between text-sm">
          <Link
            className={`hover:text-secondary-foreground hover:border-b-2 hover:border-primary duration-300 border-b-2 ease-linear hover:bg-primary/10 px-3 py-1 rounded-t-sm border-transparent`}
            href="/"
          >
            Home
          </Link>
          <Link
            className={`hover:text-secondary-foreground hover:border-b-2 hover:border-primary duration-300 border-b-2 ease-linear hover:bg-primary/10 px-3 py-1 rounded-t-sm border-transparent`}
            href="/dashboard"
          >
            Dashboard
          </Link>
        </div>

        <div
          className="size-8 bg-secondary border border-primary rounded-full
             flex items-center justify-center text-black hover:bg-primary"
        >
          <SidebarTrigger className="hover:bg-primary rounded-full" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
