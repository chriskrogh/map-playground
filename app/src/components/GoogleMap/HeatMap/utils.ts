import { Continent } from "../types";

export const BASE_MAP_CONFIG: google.maps.MapOptions = {
  zoom: 4,
  maxZoom: 6,
  minZoom: 4,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
};

export const getContinentConfig = (
  continent: Continent
): google.maps.MapOptions => {
  switch (continent) {
    case "NAM":
      return {
        center: { lat: 37.967243, lng: -96.77155 },
        restriction: {
          latLngBounds: {
            north: 60,
            south: 20,
            east: -50,
            west: -140,
          },
        },
      };
    case "EUR":
      return {
        center: { lat: 48.856614, lng: 2.3522219 },
        zoom: 5,
      };
  }
};

export const getRegionColor = (retailerCount: number) => {
  if (retailerCount <= 500) {
    return "#F4F3EB";
  } else if (retailerCount <= 1000) {
    return "#D9D8CD";
  } else if (retailerCount <= 5000) {
    return "#C8CBBA";
  } else {
    return "#91957B";
  }
};
