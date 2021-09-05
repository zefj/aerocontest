import { PathOptions } from "leaflet";

export const ROUTE_LINE_STYLE_BASE: PathOptions = {
  weight: 3,
  color: "#2c83cb",
  lineCap: "butt",
};

export const ROUTE_LINE_STYLE_ONTRACK: PathOptions = {
  color: "#06CB13",
};

export const ROUTE_LINE_STYLE_OFFTRACK: PathOptions = {
  color: "#cb123d",
};

export const ROUTE_LINE_STYLE_UNKNOWN: PathOptions = {
  color: "#999999",
  dashArray: "3, 3",
};

export const ROUTE_LINE_HOVER: PathOptions = {
  weight: 10,
};

export const OFFTRACK_POINT_TOOLTIP_OPTIONS: L.TooltipOptions = {
  permanent: true,
  direction: "auto",
};
