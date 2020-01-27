import React from 'react';
import './App.css';
import { LeafletMap } from './components/LeafletMap';

import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

// stupid hack so that leaflet's images work after going through webpack
// https://github.com/PaulLeCam/react-leaflet/issues/255#issuecomment-388492108
import marker from 'leaflet/dist/images/marker-icon.png';
import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: marker2x,
    iconUrl: marker,
    shadowUrl: markerShadow
});

const App: React.FC = () => {
  return (
    <div className="App">
        <LeafletMap />
    </div>
  );
};

export default App;
