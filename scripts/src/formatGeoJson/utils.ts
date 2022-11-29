import { Coordinate } from "./types";

function getMiddle(prop: "lat" | "lng", coordinates: Coordinate[]) {
  let values = coordinates.map((m) => m[prop]);
  let min = Math.min(...values);
  let max = Math.max(...values);
  if (prop === "lng" && max - min > 180) {
    values = values.map((val) => (val < max - 180 ? val + 360 : val));
    min = Math.min(...values);
    max = Math.max(...values);
  }
  let result = (min + max) / 2;
  if (prop === "lng" && result > 180) {
    result -= 360;
  }
  return result;
}

const findLargestPolygon = (polygons: Coordinate[][]) => {
  let max = polygons[0];
  let maxLength = polygons[0].length;
  for (let i = 1; i < polygons.length; ++i) {
    if (polygons[i].length > maxLength) {
      max = polygons[i];
      maxLength = polygons[i].length;
    }
  }
  return max;
};

export function findMidpoint(polygons: Coordinate[][]) {
  const largestPolygon = findLargestPolygon(polygons);
  return {
    lat: getMiddle("lat", largestPolygon),
    lng: getMiddle("lng", largestPolygon),
  };
}
