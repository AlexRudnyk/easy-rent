"use client";

import React, { useRef } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { mapTheme } from './mapTheme';

interface IMapProps {
  center: { lat: number; lng: number };
}

const containerStyle = {
  width: "100%",
  height: "100%",
};

const Map = ({ center }: IMapProps) => {
  const mapRef = useRef<google.maps.Map | undefined>(undefined);

  const defaultOptions = {
    panControl: true,
    zoomControl: true,
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

  return (
    <div className="w-screen h-screen">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultOptions}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </div>
  );
};

export default Map;
