import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Polyline, Popup, TileLayer } from "react-leaflet";

import {
  getSelectedPolyline,
  findSelectedPolyline,
} from "../../state/routes/routesReducer";
import {
  deselectPolyline,
  overrideAnalysis,
} from "../../state/routes/routesActions";

export const PolylinePopup = () => {
  const selectedPolyline = useSelector(getSelectedPolyline);
  const selectedPolylineData = useSelector(findSelectedPolyline);

  const ref = useRef<Polyline>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedPolyline) {
      return;
    }

    if (!ref || !ref.current) {
      return;
    }

    ref.current.leafletElement.openPopup();
    // selectedPolyline.ref.setStyle({
    //     weight: 5
    // })

    // selectedPolyline.ref.bindPopup("test")
    // .on("popupclose", () => {
    //     dispatch(deselectPolyline())

    //     selectedPolyline.ref.setStyle({
    //         weight: 2
    //     })
    // })
    // .openPopup();
  }, [selectedPolyline]);

  if (!selectedPolyline || !selectedPolylineData) {
    return null;
  }

  return (
    <Polyline ref={ref} positions={selectedPolylineData.latLngs}>
      <Popup closeOnClick={false} onClose={() => dispatch(deselectPolyline())}>
        {selectedPolylineData.type === "offtrack" && (
          <button
            onClick={() =>
              dispatch(
                overrideAnalysis(
                  selectedPolyline.id,
                  selectedPolyline.analysis_id,
                  "ontrack"
                )
              )
            }
          >
            Zalicz jako w trasie
          </button>
        )}

        {selectedPolylineData.type === "ontrack" && (
          <button
            onClick={() =>
              dispatch(
                overrideAnalysis(
                  selectedPolyline.id,
                  selectedPolyline.analysis_id,
                  "offtrack"
                )
              )
            }
          >
            Zalicz jako poza trasą
          </button>
        )}
      </Popup>
    </Polyline>
  );
};
