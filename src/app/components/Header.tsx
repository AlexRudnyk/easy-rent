import React from "react";
import { AddAdvertBtn, Logo } from ".";
import Link from "next/link";

const Header = () => {
  return (
    <header className="h-[70px] bg-cyan-900 flex items-center justify-between fixed top-0 z-10 w-screen px-20">
      <Logo />
      <nav>
        <Link
          href="#"
          className="text-white hover:text-yellow-400 focus:text-yellow-400 transition-all mr-16"
        >
          Головна
        </Link>
        <Link
          href="#"
          className="text-white hover:text-yellow-400 focus:text-yellow-400 transition-all mr-16"
        >
          Оголошення
        </Link>
        <Link
          href="#"
          className="text-white hover:text-yellow-400 focus:text-yellow-400 transition-all mr-16"
        >
          Новини
        </Link>
        <Link
          href="#"
          className="text-white hover:text-yellow-400 focus:text-yellow-400 transition-all"
        >
          Наша місія
        </Link>
      </nav>
      <AddAdvertBtn />
    </header>
  );
};

export default Header;
