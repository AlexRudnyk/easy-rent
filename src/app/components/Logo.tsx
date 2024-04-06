import React from "react";
import { Gloria_Hallelujah } from "next/font/google";
import Link from "next/link";

const gloria_Hallelujah = Gloria_Hallelujah({
  subsets: ["latin"],
  weight: "400",
});

const Logo = () => {
  return (
    <div>
      <Link href="/">
        <h2
          className={`${gloria_Hallelujah.className} text-3xl text-yellow-300`}
        >
          Easy Rent
        </h2>
      </Link>
    </div>
  );
};

export default Logo;
