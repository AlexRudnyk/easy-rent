import React from "react";
import { IAdvert } from "../../../types/IAdvert";

interface AdvertItemProps {
  advert: IAdvert;
}

const AdvertItem = ({ advert }: AdvertItemProps) => {
  return <li>AdvertItem</li>;
};

export default AdvertItem;
