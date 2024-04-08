"use client";

import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { deleteAdvert } from "../../../actions";
import { IAdvert } from "../../../types/IAdvert";

interface ModalAddAdvertProps {
  advert: IAdvert;
  onClose: () => void;
}

const ModalDeleteAdvert = ({ onClose, advert }: ModalAddAdvertProps) => {
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
      <div className="relative w-[500px] bg-white p-8  rounded-2xl">
        <button
          type="button"
          className="absolute top-[10px] right-[10px] p-4 rounded-full z-10"
          onClick={onClose}
        >
          <AiOutlineClose />
        </button>
        <p className="mb-[50px]">
          Ви впевнені, що хочете видалити це повідомлення?
        </p>
        <div className="flex items-center justify-center">
          <button
            type="button"
            className="flex justify-center items-center mr-[50px] py-3 px-6 outline-none hover:shadow-[7px_15px_20px_0px_rgba(0,0,0,0.6)] hover:bg-yellow-400 focus:shadow-[7px_15px_20px_0px_rgba(0,0,0,0.6)] transition ease-in-out focus:bg-yellow-400 bg-yellow-300 rounded-md"
            onClick={onClose}
          >
            Скасувати
          </button>
          <button
            type="button"
            onClick={() => {
              if (advert._id) deleteAdvert(advert._id);
            }}
            className="flex justify-center items-center py-3 px-6 outline-none hover:shadow-[7px_15px_20px_0px_rgba(0,0,0,0.6)] hover:bg-yellow-400 focus:shadow-[7px_15px_20px_0px_rgba(0,0,0,0.6)] transition ease-in-out focus:bg-yellow-400 bg-yellow-300 rounded-md"
          >
            Видалити
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteAdvert;
