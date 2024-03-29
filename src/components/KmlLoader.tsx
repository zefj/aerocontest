import React, { useContext, useEffect } from "react";
import { useLeaflet } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { getTrack } from "../state/track/trackReducer";

import L from "leaflet";
import "leaflet-kml";
import { loadTrack } from "../state/track/trackActions";
import { RouteLayersContext } from "../state/store";

const kmlFile = require('../test-data/WOJTEK.kml');

const loadKmlFile = (url: string, cb: Function) => {
  var req = new window.XMLHttpRequest();
  req.open("GET", url);
  try {
    req.overrideMimeType("text/xml");
  } catch (e) {}
  req.onreadystatechange = function () {
    if (req.readyState !== 4) return;
    if (req.status === 200) cb(req.responseText);
  };
  req.send(null);
};

export const KmlLoader: React.FC = () => {
  const { map } = useLeaflet();
  const dispatch = useDispatch();
  const { trackLayer } = useContext(RouteLayersContext);

  const track = useSelector(getTrack);

  useEffect(() => {
    if (process.env.REACT_APP_EXAMPLE_DATA === "true") {
      loadKmlFile(kmlFile, (content: string) => dispatch(loadTrack(content)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!map) {
      return;
    }

    if (!track?.content) {
      return;
    }

    const parser = new DOMParser();
    const kmlContent = parser.parseFromString(track.content, "text/xml");

    // @ts-ignore
    const kml = new L.KML(kmlContent);
    kml
      .getLayers()[0]
      .getLayers()
      .forEach((layer: any) => trackLayer.addLayer(layer));

    map.fireEvent("TRACK_LOADED");
  }, [map, track, trackLayer]);

  return null;
};
