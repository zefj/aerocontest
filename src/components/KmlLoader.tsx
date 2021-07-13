import React, { useEffect } from "react";
import { useLeaflet } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { getTrack } from "../state/track/trackReducer";

import L from "leaflet";
import "leaflet-kml";
import { loadTrack } from "../state/track/trackActions";

const kmlFile = require("../test-data/doc.kml");

const loadKmlFile = (url: string, cb: Function) => {
  var req = new window.XMLHttpRequest();
  req.open("GET", url);
  try {
    req.overrideMimeType("text/xml");
  } catch (e) {}
  req.onreadystatechange = function () {
    if (req.readyState != 4) return;
    if (req.status == 200) cb(req.responseText);
  };
  req.send(null);
};

export const KmlLoader: React.FC = () => {
  const { map } = useLeaflet();
  const dispatch = useDispatch();

  const track = useSelector(getTrack);

  useEffect(() => {
    loadKmlFile(kmlFile, (content: string) => dispatch(loadTrack(content)));
  }, []);

  useEffect(() => {
    if (!map) {
      return;
    }

    if (!track?.content) {
      return;
    }

    const parser = new DOMParser();
    const kml = parser.parseFromString(track.content, "text/xml");

    // @ts-ignore
    const trackLayer = new L.KML(kml);
    trackLayer
      .getLayers()[0]
      .getLayers()
      .forEach((layer: any) => track.layer.addLayer(layer));

    map.fireEvent("TRACK_LOADED");
  }, [map, track.content]);

  return null;
};
