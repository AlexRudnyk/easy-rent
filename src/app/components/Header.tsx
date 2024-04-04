import React from "react";
import { AddAdvertBtn } from ".";

const Header = () => {
  return (
    <div className="h-[70px] bg-gray-200 flex items-center fixed top-0 z-10 w-screen px-5">
      <AddAdvertBtn />
    </div>
  );
};

export default Header;
