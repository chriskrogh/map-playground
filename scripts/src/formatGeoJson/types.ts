export type Coordinate = { lat: number; lng: number };

export type RegionInfo = {
  name: string;
  key: string;
  midpoint: Coordinate;
  polygons: Coordinate[][];
};

export type Continent = "NAM" | "EUR";
