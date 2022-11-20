import { BASE_STYLE_KEY } from "./consts";
import { EUROPEAN_REGION_INFO } from "./regions/europe";
import { US_REGION_INFO } from "./regions/us";
import { Polygon, RegionInfo } from "./types";

const getPolygon = ({ coordinates }: Polygon) => {
  return `
    <Polygon>
      <altitudeMode>clampToGround</altitudeMode>
      <outerBoundaryIs>
        <LinearRing>
          <coordinates>
            ${coordinates.map((coordinate) => coordinate.join(",")).join("\n")}
          </coordinates>
        </LinearRing>
      </outerBoundaryIs>
    </Polygon>
  `;
};

const getPlacemark = (key: string, regionInfo: RegionInfo) => {
  const { name, polygons } = regionInfo;
  return `
    <Placemark>
      <name>
        <![CDATA[${name}]]>
      </name>
      <styleUrl>#${BASE_STYLE_KEY}</styleUrl>
      <styleUrl>#${key}</styleUrl>
      <MultiGeometry>
        ${polygons.map(getPolygon).join("\n")}
      </MultiGeometry>
    </Placemark>
  `;
};

export const getPlacemarks = () => {
  const USPlacemarks = Object.entries(US_REGION_INFO).map(([key, regionInfo]) =>
    getPlacemark(key, regionInfo)
  );
  const EuropePlacemarks = Object.entries(EUROPEAN_REGION_INFO).map(
    ([key, regionInfo]) => getPlacemark(key, regionInfo)
  );
  return [...USPlacemarks, ...EuropePlacemarks];
};
