import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";

export const OpenLayerMap: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && ref.current) {
      const map = new Map({
        layers: [
          new TileLayer({
            source: new XYZ({
              url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            }),
          }),
        ],
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });
      map.setTarget(ref.current);
    }
  }, []);

  return <StyledMap {...{ ref }} />;
};

const StyledMap = styled.div`
  width: 750px;
  height: 450px;
`;
