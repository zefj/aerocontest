import React, { useState } from "react";
import { Map, TileLayer, ZoomControl, ScaleControl } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { Route } from "react-router";

import "./LeafletMap.scss";
import { GpxLoader } from "./GpxLoader";
import { TrackDrawer } from "./TrackDrawer/TrackDrawer";
import { RouteAnalyser } from "./RouteAnalyser/RouteAnalyser";
import { AnalysisDrawer } from "./RouteAnalyser/AnalysisDrawer";
import { KmlLoader } from "./KmlLoader";
import { PolylinePopup } from "./PolylinePopup/PolylinePopup";

const PREFER_CANVAS = false;

export const LeafletMap: React.FC = () => {
  const [position] = useState<LatLngExpression>({
    lat: 51.505,
    lng: -0.09,
  });

  const [zoom] = useState<number>(13);

  // const context = useLeaflet();

  // // Make leaflet acknowledge the container size, otherwise it wont render all tiles
  // useLayoutEffect(() => {
  //     if (!context.map) {
  //         return;
  //     }

  //     context.map.invalidateSize();
  // }, [context.map]);

  return (
    <div className="map-container">
      <Map
        center={position}
        zoom={zoom}
        zoomControl={false}
        preferCanvas={PREFER_CANVAS}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="topleft" />
        <ScaleControl position="bottomleft" imperial={false} />

        <GpxLoader />
        <KmlLoader />
        <Route path="/track">
          {({ match }) => <TrackDrawer drawingMode={Boolean(match)} />}
        </Route>
        <RouteAnalyser />
        <AnalysisDrawer />
        <PolylinePopup />
      </Map>
    </div>
  );
};
