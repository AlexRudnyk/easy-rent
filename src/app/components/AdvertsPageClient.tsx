"use client";

import React, { useCallback, useState } from "react";
import { useJsApiLoader, Libraries } from "@react-google-maps/api";
import { Map, ModalAddAdvert } from ".";
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
  const [visibleMarkers, setVisibleMarkers] = useState<
    (string | undefined)[] | undefined
  >([]);
  const [selectedPoint, setSelectedPoint] = useState<string | undefined>(
    undefined
  );

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

  const sortedAdverts = selectedPoint
    ? adverts?.filter(({ _id }) => _id === selectedPoint)
    : adverts?.filter(({ _id }) => visibleMarkers?.includes(_id));

  return (
    <>
      {isLoaded ? (
        <>
          <div className="flex pt-[70px] w-screen h-screen">
            <Map
              center={center}
              adverts={adverts}
              setVisibleMarkers={setVisibleMarkers}
              selectedPoint={selectedPoint}
              setSelectedPoint={setSelectedPoint}
            />
            <div className="w-[400px] bg-gray-300 p-2 overflow-y-scroll">
              {selectedPoint ? (
                <div className="flex flex-col py-4">
                  <button
                    className="p-2 w-[110px] mb-[20px] self-center border-none hover:shadow-[7px_15px_20px_0px_rgba(0,0,0,0.6)] hover:bg-yellow-400 focus:shadow-[7px_15px_20px_0px_rgba(0,0,0,0.6)] transition ease-in-out focus:bg-yellow-400 bg-yellow-300 rounded-md"
                    onClick={() => setSelectedPoint(undefined)}
                  >
                    Скасувати
                  </button>
                  <p className="text-lg">До Вашої уваги обраний об'єкт</p>
                </div>
              ) : (
                sortedAdverts?.length !== 0 && (
                  <div>
                    <p className="pt-4 mb-6 text-lg">
                      На обраній ділянці карти знайдено оголошень:{" "}
                      {sortedAdverts?.length}
                    </p>
                  </div>
                )
              )}
              {adverts?.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-lg">
                    Нажаль, жодного оголошення ще не додано. Скористайтесь своєю
                    можливістю
                  </p>
                </div>
              ) : sortedAdverts?.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-lg">
                    На видиму ділянку карти не потряпляють оголошення.
                    Спробуйте, будь ласка, змінити масштаб
                  </p>
                </div>
              ) : (
                <>
                  {/* <div>
                    <p className="pt-4 mb-6 text-lg">
                      На обраній ділянці карти знайдено оголошень:{" "}
                      {sortedAdverts?.length}
                    </p>
                  </div> */}
                  <ul className="">
                    {sortedAdverts?.map((advert: IAdvert) => (
                      <AdvertItem
                        key={advert._id}
                        advert={advert}
                        selectedPoint={selectedPoint}
                        setSelectedPoint={setSelectedPoint}
                      />
                    ))}
                  </ul>
                </>
              )}
            </div>
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
