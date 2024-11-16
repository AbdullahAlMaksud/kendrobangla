import Script from "next/script";

const AdSense = ({ pId }) => {
  return (
    <div>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`}
        crossorigin="anonymous"
        strategy="afterInteractive"
      />
    </div>
  );
};

export default AdSense;
