import { CANADIAN_REGION_INFO } from "./regions/can";
import { EUROPEAN_REGION_INFO } from "./regions/europe";
import { US_REGION_INFO } from "./regions/us";
import { Continent } from "./types";

const getRegionColor = (retailerCount: number) => {
  if (retailerCount <= 500) {
    return "ffcdd8d9";
  } else if (retailerCount <= 2000) {
    return "ff7b9591";
  } else {
    return "ff3f5558";
  }
};

const getStyle = (key: string, retailerCount: number) => {
  const color = getRegionColor(retailerCount);
  return `
    <Style id="${key}">
      <IconStyle>
        <scale>0</scale>
      </IconStyle>
      <LineStyle>
        <color>ff333333</color>
        <width>1</width>
      </LineStyle>
      <PolyStyle>
        <color>${color}</color>
        <fill>1</fill>
        <outline>1</outline>
      </PolyStyle>
    </Style>
  `;
};

export const getStyles = (continent: Continent) => {
  switch (continent) {
    case "NAM":
      const USStyles = Object.entries(US_REGION_INFO).map(
        ([key, { retailerCount }]) => getStyle(key, retailerCount)
      );
      const CanadianStyles = Object.entries(CANADIAN_REGION_INFO).map(
        ([key, { retailerCount }]) => getStyle(key, retailerCount)
      );
      return [...USStyles, ...CanadianStyles];
    case "EUR":
      return Object.entries(EUROPEAN_REGION_INFO).map(
        ([key, { retailerCount }]) => getStyle(key, retailerCount)
      );
  }
};
