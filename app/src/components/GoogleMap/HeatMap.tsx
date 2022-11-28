import React from "react";
import ReactDOMServer from "react-dom/server";
import { InfoWindow } from "./InfoWindow";
import NAM from "./res/NAM.json";
import EUR from "./res/EUR.json";
import { MAP_STYLES } from "./styles";
import { Continent, Coordinate, RegionInfo } from "./types";
import { BASE_MAP_CONFIG, getContinentConfig, getRegionColor } from "./utils";

export class HeatMap {
  private map: google.maps.Map;

  constructor(continent: Continent, ref: HTMLDivElement) {
    this.map = new google.maps.Map(ref, {
      ...BASE_MAP_CONFIG,
      ...getContinentConfig(continent),
      styles: MAP_STYLES,
    });
    this.paintRegions(continent);
  }

  private paintRegions = (continent: Continent) => {
    switch (continent) {
      case "NAM":
        (NAM as RegionInfo[]).forEach(
          ({ name, retailerCount, polygons, midpoint }) => {
            polygons.forEach((polygon) =>
              this.setPolygon(polygon, midpoint, retailerCount, name)
            );
          }
        );
        break;
      case "EUR":
        EUR.forEach(({ name, retailerCount, polygons, midpoint }) => {
          polygons.forEach((polygon) =>
            this.setPolygon(polygon, midpoint, retailerCount, name)
          );
        });
        break;
    }
  };

  private setPolygon = (
    paths: Coordinate[],
    midpoint: Coordinate,
    retailerCount: number,
    regionName: string
  ) => {
    const polygon = new google.maps.Polygon({
      paths,
      strokeColor: "#333333",
      strokeWeight: 0.5,
      fillColor: getRegionColor(retailerCount),
      fillOpacity: 1,
      map: this.map,
    });

    const content = ReactDOMServer.renderToString(
      <InfoWindow {...{ retailerCount, regionName }} />
    );
    const infoWindow = new google.maps.InfoWindow({
      content,
      position: midpoint,
    });

    polygon.addListener("mouseover", () => {
      infoWindow.open({
        map: this.map,
      });
    });
    polygon.addListener("mouseout", () => {
      infoWindow.close();
    });
  };
}
