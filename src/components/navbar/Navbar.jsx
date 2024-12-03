import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.png";
import { SheetSide } from "./MenuSidebar";
import ProfileDropDown from "./ProfileDropDown";

const Navbar = () => {
  return (
    <nav className="fixed w-full">
      <div className="bg-primary-foreground/90 backdrop-blur-sm shadow-sm shadow-black/20 text-white flex justify-between md:justify-between items-center h-16 px-4 flex-row">
        {/* Profile */}
        <ProfileDropDown />
        {/* Logo */}
        <Link href="/" className="">
          <Image
            src={logo}
            alt="KendroBangla Logo"
            width={100}
            height={50}
            className="object-cover"
          />
        </Link>
        {/* Large Display */}
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
        {/* Sidebar */}
        <SheetSide />
      </div>
    </nav>
  );
};

export default Navbar;
