import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import styled from "styled-components";
import { BASE_MAP_CONFIG } from "./utils";
import { MAP_STYLES } from "./styles";

const NAM_CENTER = { lat: 37.967243, lng: -96.77155 };
const EUR_CENTER = { lat: 48.856614, lng: 2.3522219 };

const GoogleMap: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [focussedRegion, setFocussedRegion] = useState<"NAM" | "EUR">("NAM");

  useEffect(() => {
    if (typeof window !== "undefined" && ref.current) {
      const map = new window.google.maps.Map(ref.current, {
        ...BASE_MAP_CONFIG,
        center: focussedRegion === "NAM" ? NAM_CENTER : EUR_CENTER,
        styles: MAP_STYLES,
      });
      if (focussedRegion === "NAM") {
        new google.maps.KmlLayer({
          url: `https://storage.googleapis.com/maps-playground-kmls/${focussedRegion}.kml`,
          map,
        });
      }
    }
  }, [focussedRegion]);

  return (
    <div>
      <StyledMap id="map" {...{ ref }} />;
      <ButtonContainer>
        <Button onClick={() => setFocussedRegion("NAM")}>NAM</Button>
        <Button onClick={() => setFocussedRegion("EUR")}>EUR</Button>
      </ButtonContainer>
    </div>
  );
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

const ButtonContainer = styled.div`
  display: flex;
`;

const Button = styled.button`
  padding: 16px;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  color: #0000ee;
`;
