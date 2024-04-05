"use client";

import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { AddAdvertForm } from ".";

interface ModalAddAdvertProps {
  onClose: () => void;
  isLoaded: boolean;
  onSelect: (coordinates: { lat: number; lng: number }) => void;
}

const ModalAddAdvert = ({
  onClose,
  isLoaded,
  onSelect,
}: ModalAddAdvertProps) => {
  useEffect(() => {
    const onEscClick = (e: KeyboardEvent) => {
      if (e.code === "Escape") onClose();
    };

    window.addEventListener("keydown", onEscClick);

    return () => {
      window.removeEventListener("keydown", onEscClick);
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget === e.target) onClose();
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 p-5"
    >
      <div className="relative w-[500px] bg-white p-8 flex justify-center items-center rounded-2xl">
        <button
          type="button"
          className="absolute top-[10px] right-[10px] p-4 rounded-full z-10"
          onClick={onClose}
        >
          <AiOutlineClose />
        </button>
        <AddAdvertForm
          isLoaded={isLoaded}
          onSelect={onSelect}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default ModalAddAdvert;
