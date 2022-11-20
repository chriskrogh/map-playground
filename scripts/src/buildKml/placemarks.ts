import { EUROPEAN_REGION_INFO } from "./regions/europe";
import { US_REGION_INFO } from "./regions/us";
import { Continent, Polygon, RegionInfo } from "./types";

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
      <styleUrl>#${key}</styleUrl>
      <MultiGeometry>
        ${polygons.map(getPolygon).join("")}
      </MultiGeometry>
    </Placemark>
  `;
};

export const getPlacemarks = (continent: Continent) => {
  switch (continent) {
    case "NAM":
      return Object.entries(US_REGION_INFO).map(([key, regionInfo]) =>
        getPlacemark(key, regionInfo)
      );
    case "EUR":
      return Object.entries(EUROPEAN_REGION_INFO).map(([key, regionInfo]) =>
        getPlacemark(key, regionInfo)
      );
  }
};
