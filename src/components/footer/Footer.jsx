import Image from "next/image";

import logo from "../../../public/logo.png";
const Footer = () => {
  return (
    <footer className="bg-secondary text-primary py-8 z-0">
      <div className="flex flex-col justify-center items-center">
        <Image
          src={logo}
          width={150}
          height={100}
          alt="Logo"
          className=""
        ></Image>
        <h2>একটি পরিপূর্ণ বাংলা ওয়েব ম্যাগাজিন!</h2>
      </div>
    </footer>
  );
};

export default Footer;
