import flatten from "lodash/flatten";
import CanadaJson from "./res/canada.geo.json";
import CountriesJson from "./res/countries.geo.json";
import UsJson from "./res/us.geo.json";
import { Coordinate, RegionInfo } from "./types";
import { findMidpoint } from "./utils";
import {
  CANADIAN_PROVINCE_NAME_CODE_MAP,
  EUR_COUNTRY_CODES,
  US_STATE_NAME_CODE_MAP,
} from "./regions";

const buildRegionInfo = (
  name: string,
  key: string,
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
    key,
    polygons,
    midpoint: findMidpoint(polygons),
  };
};

const buildUsRegionInfo = () => {
  return UsJson.features.map(({ properties, geometry }) =>
    buildRegionInfo(
      properties.NAME,
      US_STATE_NAME_CODE_MAP[
        properties.NAME as keyof typeof US_STATE_NAME_CODE_MAP
      ],
      geometry.coordinates,
      geometry.type
    )
  );
};

const buildCanadaRegionInfo = () => {
  return CanadaJson.features.map(({ properties, geometry }) =>
    buildRegionInfo(
      properties.prov_name_en,
      CANADIAN_PROVINCE_NAME_CODE_MAP[
        properties.prov_name_en as keyof typeof CANADIAN_PROVINCE_NAME_CODE_MAP
      ],
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
      buildRegionInfo(
        properties.ADMIN,
        properties.ISO_A3,
        geometry.coordinates,
        geometry.type
      )
    );
};
