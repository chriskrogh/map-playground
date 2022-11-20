import { writeFileSync } from "fs";
import { CLOSING, OPENING } from "./consts";
import { getPlacemarks } from "./placemarks";
import { getStyles } from "./styles";

if (process.argv.length < 3) {
  console.log("Continent must be provided as an argument. e.g. NAM, EUR, ...");
  process.exit(1);
}

const continent = process.argv[2];
if (continent !== "NAM" && continent !== "EUR") {
  console.log(`Unknown continent "${continent}".`);
  process.exit(1);
}

const content: string[] = [OPENING];
content.push(...getStyles(continent));
content.push(...getPlacemarks(continent));
content.push(CLOSING);
const kml = content.join("");
writeFileSync(`build/${continent}.kml`, kml);
