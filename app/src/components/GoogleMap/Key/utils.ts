import { BoundaryType } from "./types";

export const getBoundaryText = ({ lower, upper }: BoundaryType) => {
  if (lower && upper) {
    return `${lower} - ${upper}`;
  } else if (lower) {
    return `over ${lower}`;
  } else if (upper) {
    return `up to ${upper}`;
  } else {
    return "";
  }
};

export const BOUNDARIES: (BoundaryType & { color: string })[] = [
  { color: "#F4F3EB", upper: 500 },
  { color: "#D9D8CD", lower: 500, upper: 1000 },
  { color: "#C8CBBA", lower: 1000, upper: 5000 },
  { color: "#91957B", lower: 5000 },
];
