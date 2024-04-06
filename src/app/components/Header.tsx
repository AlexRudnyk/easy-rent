import React from "react";
import { AddAdvertBtn, Logo } from ".";

const Header = () => {
  return (
    <header className="h-[70px] bg-cyan-900 flex items-center justify-between fixed top-0 z-10 w-screen px-20">
      <Logo />
      <AddAdvertBtn />
    </header>
  );
};

export default Header;
