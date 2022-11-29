import React from "react";
import ReactDOMServer from "react-dom/server";
import { InfoWindow } from "./InfoWindow";
import { MAP_STYLES } from "./styles";
import { Continent, Coordinate, RegionInfo } from "./types";
import { BASE_MAP_CONFIG, getContinentConfig, getRegionColor } from "./utils";
import { EUR_RETAILER_COUNTS, NAM_RETAILER_COUNTS } from "./consts";

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

  private paintRegions = async (continent: Continent) => {
    switch (continent) {
      case "NAM": {
        const regionInfo = await this.fetchRegionInfo("NAM");
        regionInfo?.forEach(({ name, key, polygons, midpoint }) => {
          polygons.forEach((polygon) =>
            this.setPolygon(
              polygon,
              midpoint,
              NAM_RETAILER_COUNTS[key as keyof typeof NAM_RETAILER_COUNTS],
              name
            )
          );
        });
        break;
      }
      case "EUR": {
        const regionInfo = await this.fetchRegionInfo("EUR");
        regionInfo?.forEach(({ name, key, polygons, midpoint }) => {
          polygons.forEach((polygon) =>
            this.setPolygon(
              polygon,
              midpoint,
              EUR_RETAILER_COUNTS[key as keyof typeof EUR_RETAILER_COUNTS],
              name
            )
          );
        });
        break;
      }
    }
  };

  private fetchRegionInfo = async (continent: Continent) => {
    try {
      const response = await fetch(
        `https://storage.googleapis.com/maps-playground-kmls/${continent}.json`
      );
      return (await response.json()) as RegionInfo[];
    } catch (error) {
      console.error(error);
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
