import { PathOptions } from 'leaflet';

export const ROUTE_LINE_STYLE: PathOptions = {
    weight: 2,
    color: "#2c83cb",
};

export const ROUTE_LINE_STYLE_ONTRACK: PathOptions = {
    ...ROUTE_LINE_STYLE,
    color: "#06CB13",
};

export const ROUTE_LINE_STYLE_OFFTRACK: PathOptions = {
    ...ROUTE_LINE_STYLE,
    color: "#cb123d",
};

export const OFFTRACK_POINT_TOOLTIP_OPTIONS: L.TooltipOptions = {
    permanent: true,
    direction: 'auto'
};
