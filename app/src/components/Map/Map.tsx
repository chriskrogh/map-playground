import React, { ReactElement, useEffect, useRef } from "react";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import styled from "styled-components";
import { BASE_MAP_CONFIG } from "./utils";
import { MAP_STYLES } from "./styles";

const GoogleMap: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && ref.current) {
      const map = new window.google.maps.Map(ref.current, {
        ...BASE_MAP_CONFIG,
        center: { lat: 37.967243, lng: -96.77155 },
        styles: MAP_STYLES,
      });
      new google.maps.KmlLayer({
        url: "https://storage.googleapis.com/maps-playground-kmls/us-states.kml",
        map,
      });
    }
  }, []);

  return <StyledMap id="map" {...{ ref }} />;
};

const MapHandler = (status: Status): ReactElement => {
  switch (status) {
    case Status.LOADING:
      return <p>Loading...</p>;
    case Status.FAILURE:
      return <p>Failed to load Google Maps</p>;
    case Status.SUCCESS:
      return <GoogleMap />;
  }
};

export const Map: React.FC = () => (
  <Wrapper
    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}
    render={MapHandler}
  />
);

const StyledMap = styled.div`
  width: 750px;
  height: 450px;
`;
