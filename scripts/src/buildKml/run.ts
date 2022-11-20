import { writeFileSync } from "fs";
import { CLOSING, OPENING } from "./consts";
import { getPlacemarks } from "./placemarks";
import { getStyles } from "./styles";

const buildKml = async () => {
  const content: string[] = [OPENING];
  content.push(...getStyles());
  content.push(...getPlacemarks());
  content.push(CLOSING);
  const kml = content.join("");
  writeFileSync("build/map.kml", kml);
};

buildKml();
