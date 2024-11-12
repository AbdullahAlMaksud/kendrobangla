import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.png";

const Navbar = () => {
  return (
    <nav className="fixed w-full">
      <div className="bg-primary-foreground/80 backdrop-blur-sm shadow-sm shadow-black/20 text-white flex justify-between items-center h-16 px-8 ">
        <Link href="/">
          <Image
            src={logo}
            alt="KendroBangla Logo"
            width={100}
            height={50}
            className="object-cover"
          />
        </Link>
        <div className="flex text-primary justify-between text-sm">
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
      </div>
    </nav>
  );
};

export default Navbar;
