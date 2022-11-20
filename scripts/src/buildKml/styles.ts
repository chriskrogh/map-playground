import { EUROPEAN_REGION_INFO } from "./regions/europe";
import { US_REGION_INFO } from "./regions/us";

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
      <PolyStyle>
        <color>${color}</color>
        <fill>1</fill>
        <outline>1</outline>
      </PolyStyle>
    </Style>
  `;
};

export const getStyles = () => {
  const USStyles = Object.entries(US_REGION_INFO).map(
    ([key, { retailerCount }]) => getStyle(key, retailerCount)
  );
  const EuropeStyles = Object.entries(EUROPEAN_REGION_INFO).map(
    ([key, { retailerCount }]) => getStyle(key, retailerCount)
  );
  return [...USStyles, ...EuropeStyles];
};
