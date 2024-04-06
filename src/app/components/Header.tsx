import React from "react";
import { AddAdvertBtn, Logo } from ".";

const Header = () => {
  return (
    <div className="h-[70px] bg-cyan-900 flex items-center justify-between fixed top-0 z-10 w-screen px-10">
      <Logo />
      <AddAdvertBtn />
    </div>
  );
};

export default Header;
