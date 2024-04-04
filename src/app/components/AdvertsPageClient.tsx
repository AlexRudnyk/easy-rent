"use client";

import React, { useCallback, useState } from "react";
import { useJsApiLoader, Libraries } from "@react-google-maps/api";
import { Autocomplete, Map } from ".";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const defaultCenter = {
  lat: 50.450001,
  lng: 30.523333,
};

const libraries: Libraries | undefined = ["places"];

const AdvertsPageClient = () => {
  const [center, setCenter] = useState(defaultCenter);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY as string,
    libraries,
  });

  const onPlaceSelect = useCallback(
    (coordinates: { lat: number; lng: number }) => {
      setCenter(coordinates);
    },
    []
  );

  return (
    <div>
      <div>
        <Autocomplete isLoaded={isLoaded} onSelect={onPlaceSelect} />
      </div>
      {isLoaded ? (
        <Map center={center} />
      ) : (
        <div className="w-screen h-screen flex items-center justify-center">
          <h2>Loading...</h2>
        </div>
      )}
    </div>
  );
};

export default AdvertsPageClient;