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
      className="p-4 border-none bg-lime-400 rounded-md"
      onClick={handleModalToggle}
    >
      Додати оголошення
    </button>
  );
};

export default AddAdvertBtn;
