"use client";

import React from "react";
import { useJsApiLoader, Libraries } from "@react-google-maps/api";
import { Map } from ".";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const defaultCenter = {
  lat: 50.450001,
  lng: 30.523333,
};

const libraries: Libraries | undefined = ["places"];

const AdvertsPageClient = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY as string,
    libraries,
  });

  return (
    <div>
      {isLoaded ? (
        <Map center={defaultCenter} />
      ) : (
        <div className="w-screen h-screen flex items-center justify-center">
          <h2>Loading...</h2>
        </div>
      )}
    </div>
  );
};

export default AdvertsPageClient;
