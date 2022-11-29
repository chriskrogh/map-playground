import flatten from "lodash/flatten";
import CanadaJson from "./res/canada.geo.json";
import CountriesJson from "./res/countries.geo.json";
import UsJson from "./res/us.geo.json";
import { Coordinate, RegionInfo } from "./types";
import { findMidpoint } from "./utils";
import { EUR_COUNTRY_CODES } from "./regions";

const buildRegionInfo = (
  name: string,
  _coordinates: number[][][] | number[][][][],
  type: string
): RegionInfo => {
  const coordinates =
    type === "Polygon"
      ? (_coordinates as [number, number][][])
      : flatten(_coordinates as [number, number][][][]);
  const polygons: Coordinate[][] = coordinates.map(
    (boundary: [number, number][]) =>
      boundary.map((coordinate) => ({
        lat: coordinate[1],
        lng: coordinate[0],
      }))
  );

  return {
    name,
    retailerCount: 450,
    polygons,
    midpoint: findMidpoint(polygons),
  };
};

const buildUsRegionInfo = () => {
  return UsJson.features.map(({ properties, geometry }) =>
    buildRegionInfo(properties.NAME, geometry.coordinates, geometry.type)
  );
};

const buildCanadaRegionInfo = () => {
  return CanadaJson.features.map(({ properties, geometry }) =>
    buildRegionInfo(
      properties.prov_name_en,
      geometry.coordinates,
      geometry.type
    )
  );
};

export const buildNorthAmericaRegionInfo = () => {
  return [...buildUsRegionInfo(), ...buildCanadaRegionInfo()];
};

export const buildEuropeRegionInfo = () => {
  return CountriesJson.features
    .filter(({ properties }) =>
      EUR_COUNTRY_CODES.find((code) => code === properties.ISO_A3)
    )
    .map(({ properties, geometry }) =>
      buildRegionInfo(properties.ADMIN, geometry.coordinates, geometry.type)
    );
};
