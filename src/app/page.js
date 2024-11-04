import { Anek_Bangla } from "next/font/google";
import Image from "next/image";
import logo from "../../public/logo.png";

const banglaFont = Anek_Bangla({
  weight: ["400", "700"],
  subsets: ["bengali"],
});

export default function Home() {
  return (
    <main className={banglaFont.className}>
      <div className="min-h-screen">
        <section className="min-h-screen flex items-center justify-center flex-col gap-2">
          <Image
            src={logo}
            height={100}
            width={100}
            alt="KendroBangla Logo"
          ></Image>
          <h1>শিগগিরই আসছে...</h1>
        </section>
      </div>
    </main>
  );
}
