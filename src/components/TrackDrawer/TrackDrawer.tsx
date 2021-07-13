import { useEffect, useContext } from "react";
import { useLeaflet } from "react-leaflet";

import L, { Control, DrawEvents } from "leaflet";

import "leaflet-draw";
import { RouteLayersContext } from "../../state/store";

// const track = new L.FeatureGroup();
//
// const options: Control.DrawConstructorOptions = {
//     position: 'topleft',
//     draw: {
//         polyline: false,
//         marker: false,
//         circlemarker: false,
//     },
//     edit: {
//         featureGroup: track,
//     }
// };
//
// const drawControl = new L.Control.Draw(options);

let drawControl: L.Control.Draw | null;

type TrackDrawerProps = {
  drawingMode?: boolean;
};

export const TrackDrawer = ({ drawingMode = false }: TrackDrawerProps) => {
  const { map } = useLeaflet();
  const { trackLayer } = useContext(RouteLayersContext);

  useEffect(() => {
    const options: Control.DrawConstructorOptions = {
      position: "topleft",
      draw: {
        polyline: false,
        marker: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: trackLayer,
      },
    };

    drawControl = new L.Control.Draw(options);
  }, [map, trackLayer]);

  useEffect(() => {
    if (!map) {
      return;
    }

    map.addLayer(trackLayer);
  }, [map, trackLayer]);

  useEffect(() => {
    if (!map) {
      return;
    }

    if (!drawControl) {
      return;
    }

    if (drawingMode) {
      map.addControl(drawControl);
    } else {
      map.removeControl(drawControl);
    }
  }, [map, drawingMode]);

  useEffect(() => {
    if (!map) {
      return;
    }

    map.on(L.Draw.Event.CREATED, (e: any) => {
      // The event is actually DrawEvents.Created, but there is no matching definition for the `on` method,
      // which makes typescript complain about no matching overload. TODO I guess?
      const event: DrawEvents.Created = e;
      const layer = event.layer;

      trackLayer.addLayer(layer);
    });
  }, [map, trackLayer]);

  return null;
};
