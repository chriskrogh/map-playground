import { writeFileSync } from "fs";
import { Continent } from "./types";
import {
  buildNorthAmericaRegionInfo,
  buildEuropeRegionInfo,
  buildOceaniaRegionInfo,
} from "./formatter";

if (process.argv.length < 3) {
  console.log("Continent must be provided as an argument. e.g. NAM, EUR, ...");
  process.exit(1);
}

const _continent = process.argv[2];
if (_continent !== "NAM" && _continent !== "EUR" && _continent !== "OCE") {
  console.log(`Unknown continent "${_continent}".`);
  process.exit(1);
}
const continent = _continent as Continent;

const data =
  continent === "NAM"
    ? buildNorthAmericaRegionInfo()
    : continent === "EUR"
    ? buildEuropeRegionInfo()
    : buildOceaniaRegionInfo();

const fileName =
  continent === "NAM"
    ? "NORTH_AMERICA"
    : continent === "EUR"
    ? "EUROPE"
    : "OCEANIA";

writeFileSync(`build/${fileName}.json`, JSON.stringify(data, null, 2));
