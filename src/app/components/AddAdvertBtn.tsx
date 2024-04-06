"use client";

import React from "react";
import { useAppContext } from "../context";

const AddAdvertBtn = () => {
  const { isAddAdvertModalOpen, setIsAddAdvertModalOpen } = useAppContext();

  const handleModalToggle = () => {
    setIsAddAdvertModalOpen(!isAddAdvertModalOpen);
  };

  return (
    <button
      type="button"
      className="p-2 border-none hover:shadow-[7px_15px_20px_0px_rgba(0,0,0,0.6)] hover:bg-yellow-400 focus:shadow-[7px_15px_20px_0px_rgba(0,0,0,0.6)] transition ease-in-out focus:bg-yellow-400 bg-yellow-300 rounded-md"
      onClick={handleModalToggle}
    >
      Додати оголошення
    </button>
  );
};

export default AddAdvertBtn;
