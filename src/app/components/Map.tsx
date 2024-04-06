"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { mapTheme } from "./mapTheme";
import { IAdvert } from "../../../types/IAdvert";
import { debounce } from "lodash";

interface IMapProps {
  center: { lat: number; lng: number };
  adverts: IAdvert[] | undefined;
  setVisibleMarkers: (n: (string | undefined)[] | undefined) => void;
  selectedPoint: string | undefined;
  setSelectedPoint: (_id: string | undefined) => void;
}

const containerStyle = {
  width: "100%",
  height: "100%",
};

const Map = ({
  center,
  adverts,
  setVisibleMarkers,
  selectedPoint,
  setSelectedPoint,
}: IMapProps) => {
  const mapRef = useRef<google.maps.Map | undefined>(undefined);

  const defaultOptions = {
    panControl: true,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    clicableIcons: false,
    keyboardShortcuts: false,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    fullscreenControl: false,
    styles: mapTheme,
  };

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    mapRef.current = map;
  }, []);

  const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
    mapRef.current = undefined;
  }, []);

  const handleBoundsChanged = useCallback(
    debounce(() => {
      if (mapRef.current) {
        const bounds = mapRef.current.getBounds();
        if (bounds) {
          const visibleMarkers = adverts
            ?.filter((advert) =>
              bounds.contains(
                new google.maps.LatLng(
                  Number(advert.location.split(", ")[0]),
                  Number(advert.location.split(", ")[1])
                )
              )
            )
            .map((marker) => marker._id);
          setVisibleMarkers(visibleMarkers);

          // // Filter out undefined values and convert remaining strings to numbers
          // const filteredVisibleMarkers = visibleMarkers
          //   ?.filter((marker) => typeof marker === "string")
          //   .map((marker) => Number(marker));

          // if (filteredVisibleMarkers) setVisibleMarkers(filteredVisibleMarkers);
        }
      }
    }, 300),
    [mapRef, adverts, setVisibleMarkers]
  );

  useEffect(() => {
    handleBoundsChanged();
  }, [handleBoundsChanged]);

  return (
    <div className="w-full h-full">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onBoundsChanged={handleBoundsChanged}
        options={defaultOptions}
      >
        {adverts?.map(({ _id, location }) => (
          <Marker
            key={_id}
            position={{
              lat: Number(location.split(", ")[0]),
              lng: Number(location.split(", ")[1]),
            }}
            icon={{
              url:
                selectedPoint === _id
                  ? "/selected-location.svg"
                  : "/location.svg",
            }}
            zIndex={1000}
            onClick={() => setSelectedPoint(_id)}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
