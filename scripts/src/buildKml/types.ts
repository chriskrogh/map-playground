type Coordinate = [number, number];

export type Polygon = {
  coordinates: Coordinate[];
};

export type RegionInfo = {
  name: string;
  retailerCount: number;
  polygons: Polygon[];
};

export type Continent = "NAM" | "EUR";
