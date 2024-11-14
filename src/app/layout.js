import Footer from "@/components/footer/Footer";
import { Anek_Bangla } from "next/font/google";
import Navbar from "../components/navbar/Navbar";
import "./globals.css";

export const metadata = {
  title: "কেন্দ্রবাংলা | একটি পরিপূর্ণ বাংলা ওয়েব ম্যাগাজিন",
  description:
    "শিক্ষা, বিজ্ঞান, প্রযুক্তিসহ বিভিন্ন বিষয় নিয়ে সঠিক তথ্য সমৃদ্ধ সহজবোধ্য ফিচার পড়ুন কেন্দ্রবাংলায়।",
};

const anekBangla = Anek_Bangla({ subsets: ["bengali"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Navbar />
        </header>
        <main className={anekBangla.className}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
