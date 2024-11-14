import Image from "next/image";
import logo from "../../public/logo.png";
import { banglaFont } from "./fonts/banglaFont";

export default function Home() {
  return (
    <main className={banglaFont.className}>
      <section className="flex min-h-[calc(100vh-132.13px)] bg-primary w-full flex-col items-center justify-center">
        <div className="flex flex-col items-center bg-white px-20 py-5 rounded-sm shadow-inner shadow-black/60 -rotate-3 hover:rotate-0">
          <Image
            src={logo}
            height={100}
            width={100}
            alt="KendroBangla Logo"
            className="h-10 w-32 object-cover"
          ></Image>
          <h1 className="text-xl pt-2">শিগগিরই আসছে...</h1>
        </div>
      </section>
    </main>
  );
}
