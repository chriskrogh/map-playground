import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import styled from "styled-components";
import { BASE_MAP_CONFIG, getContinentConfig } from "./utils";
import { MAP_STYLES } from "./styles";
import { Continent } from "./types";

const GoogleMap: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [continent, setContinent] = useState<Continent>("NAM");

  useEffect(() => {
    if (typeof window !== "undefined" && ref.current) {
      const map = new window.google.maps.Map(ref.current, {
        ...BASE_MAP_CONFIG,
        ...getContinentConfig(continent),
        styles: MAP_STYLES,
      });
      if (continent === "NAM") {
        new google.maps.KmlLayer({
          url: `https://storage.googleapis.com/maps-playground-kmls/${continent}.kml`,
          map,
        });
      }
    }
  }, [continent]);

  return (
    <div>
      <StyledMap id="map" {...{ ref }} />;
      <ButtonContainer>
        <Button onClick={() => setContinent("NAM")}>NAM</Button>
        <Button onClick={() => setContinent("EUR")}>EUR</Button>
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
