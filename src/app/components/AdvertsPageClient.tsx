"use client";

import React, { useCallback, useState } from "react";
import { useJsApiLoader, Libraries } from "@react-google-maps/api";
import { Autocomplete, Map, ModalAddAdvert } from ".";
import { useAppContext } from "../context";
import AdvertItem from "./AdvertItem";
import { IAdvert } from "../../../types/IAdvert";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const defaultCenter = {
  lat: 50.450001,
  lng: 30.523333,
};

const libraries: Libraries | undefined = ["places"];

const AdvertsPageClient = ({ adverts }: { adverts: IAdvert[] | undefined }) => {
  const [center, setCenter] = useState(defaultCenter);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY as string,
    libraries,
  });

  const { isAddAdvertModalOpen, setIsAddAdvertModalOpen } = useAppContext();

  const handleModalToggle = () => {
    setIsAddAdvertModalOpen(!isAddAdvertModalOpen);
  };

  const onPlaceSelect = useCallback(
    (coordinates: { lat: number; lng: number }) => {
      setCenter(coordinates);
    },
    []
  );

  return (
    <>
      {/* <div className="flex justify-center">
        <Autocomplete isLoaded={isLoaded} onSelect={onPlaceSelect} />
      </div> */}
      {isLoaded ? (
        <>
          <div className="flex pt-[70px] w-screen h-screen">
            <Map center={center} />
            <ul className="w-[400px]">
              {adverts?.map((advert: IAdvert) => (
                <AdvertItem key={advert._id} advert={advert} />
              ))}
            </ul>
          </div>
          {isAddAdvertModalOpen && (
            <ModalAddAdvert
              onClose={handleModalToggle}
              isLoaded={isLoaded}
              onSelect={onPlaceSelect}
            />
          )}
        </>
      ) : (
        <div className="w-screen h-screen flex items-center justify-center">
          <h2>Loading...</h2>
        </div>
      )}
    </>
  );
};

export default AdvertsPageClient;
