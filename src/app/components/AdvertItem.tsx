import React from "react";
import { IAdvert } from "../../../types/IAdvert";
import { CldImage } from "next-cloudinary";

interface AdvertItemProps {
  advert: IAdvert;
  selectedPoint: string | undefined;
  setSelectedPoint: (_id: string | undefined) => void;
}

const AdvertItem = ({
  advert,
  selectedPoint,
  setSelectedPoint,
}: AdvertItemProps) => {
  return (
    <li
      className="p-2 pb-4 bg-white mb-4 last:mb-0 rounded-md relative cursor-pointer"
      onClick={() => setSelectedPoint(advert._id)}
    >
      <CldImage
        src={advert.image}
        alt="advertisement photo"
        width={300}
        height={300}
        className="rounded-md mb-3"
      />
      <p className="absolute flex items-center justify-center top-[8px] left-[8px] rounded-tl-md rounded-br-md w-[80px] h-[30px] bg-slate-800 text-white text-xs">
        Ціна: <span className="text-lime-300 text-xs">$ {advert.price}</span>
      </p>
      <h3 className="font-semibold text-lg mb-2">{advert.title}</h3>
      <p className="">{advert.description}</p>
    </li>
  );
};

export default AdvertItem;
