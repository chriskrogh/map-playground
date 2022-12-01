import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import styled from "styled-components";

import { HeatMap } from "./HeatMap";
import { Continent } from "./types";
import { Key, KEY_WIDTH } from "./Key";

type Props = {
  category: string;
};

const Map: React.FC<Props> = ({ category }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [continent, setContinent] = useState<Continent>("NAM");

  useEffect(() => {
    if (typeof window !== "undefined" && ref.current) {
      new HeatMap(continent, ref.current);
    }
  }, [continent]);

  return (
    <div>
      <Container>
        <StyledMap id="map" {...{ ref }} />
        <Key
          position={{
            bottom: 16,
            left: (STYLED_MAP_WIDTH - KEY_WIDTH) / 2 - 16,
          }}
          {...{ category }}
        />
      </Container>
      <ButtonContainer>
        <Button onClick={() => setContinent("NAM")}>NAM</Button>
        <Button onClick={() => setContinent("EUR")}>EUR</Button>
      </ButtonContainer>
    </div>
  );
};

export const GoogleMap: React.FC<Props> = (props) => {
  const MapHandler = (status: Status): ReactElement => {
    switch (status) {
      case Status.LOADING:
        return <p>Loading...</p>;
      case Status.FAILURE:
        return <p>Failed to load Google Maps</p>;
      case Status.SUCCESS:
        return <Map {...props} />;
    }
  };

  return (
    <Wrapper
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}
      render={MapHandler}
    />
  );
};

const Container = styled.div`
  position: relative;
`;

const STYLED_MAP_WIDTH = 860;
const StyledMap = styled.div`
  position: relative;
  width: ${STYLED_MAP_WIDTH}px;
  height: 660px;
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
