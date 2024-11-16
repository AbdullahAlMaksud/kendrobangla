import AdSense from "@/components/AdSense";
import Navbar from "../components/Navbar";
import "./globals.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata = {
  title: "কেন্দ্রবাংলা | একটি পরিপূর্ণ বাংলা ওয়েব ম্যাগাজিন",
  description:
    "শিক্ষা, বিজ্ঞান, প্রযুক্তিসহ বিভিন্ন বিষয় নিয়ে সঠিক তথ্য সমৃদ্ধ সহজবোধ্য ফিচার পড়ুন কেন্দ্রবাংলায়।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <AdSense pId="ca-pub-9291982094033631" />
      </head>
      <body>
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
