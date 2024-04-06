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
            <div className="w-[400px] bg-slate-300 p-2 overflow-y-scroll">
              {selectedPoint && (
                <div className="">
                  <button
                    className=""
                    onClick={() => setSelectedPoint(undefined)}
                  >
                    Скасувати
                  </button>
                  <p className="">До Вашої уваги обраний об'єкт</p>
                </div>
              )}
              {adverts?.length === 0 ? (
                <div>
                  <p>
                    Нажаль, жодного оголошення ще не додано. Скористайтесь своєю
                    можливістю
                  </p>
                </div>
              ) : sortedAdverts?.length === 0 ? (
                <div>
                  <p>
                    На видиму ділянку карти не потряпляють оголошення.
                    Спробуйте, будь ласка, змінити масштаб
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <p>
                      На обраній ділянці карти знайдено оголошень:{" "}
                      {sortedAdverts?.length}
                    </p>
                  </div>
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
