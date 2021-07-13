import React from "react";
import L from "leaflet";

// For some reason, if any scss file is included before plain css files, the style tags rendered
// by style loader are out of order, causing leaflet.css to be included after leaflet.draw.css.
// I have no idea what's going on, will fix after ejecting, maybe.
// TODO: try to import css from within scss to see if the order is preserved.
import "leaflet/dist/leaflet.css";
// This should be part of the TrackDrawer component, but webpack/cra config is refusing to cooperate.
import "leaflet-draw/dist/leaflet.draw.css";

import { ThemeProvider } from "emotion-theming";
import { HashRouter } from "react-router-dom";

import { LeafletMap } from "./components/LeafletMap";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { FragmentEditor } from "./components/FragmentEditor/FragmentEditor";
import { RouteLayersContextProvider } from "./components/RouteLayersContextProvider";

// stupid hack so that leaflet's images work after going through webpack
// https://github.com/PaulLeCam/react-leaflet/issues/255#issuecomment-388492108
import marker from "leaflet/dist/images/marker-icon.png";
import marker2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import "@fortawesome/fontawesome-free/css/all.css";
import { theme } from "./styles/theme";
import { Box } from "rebass";
import { Provider } from "react-redux";
import { configureStore } from "./state/store";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: marker2x,
  iconUrl: marker,
  shadowUrl: markerShadow,
});

const store = configureStore();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Box
          className="App"
          sx={{
            fontFamily: "body",
            fontSize: "body",
            color: "text",
          }}
        >
          {/* TODO: do it like this: https://turbo87.github.io/sidebar-v2/examples/ */}
          <HashRouter>
            <Sidebar />
            <FragmentEditor />
            <RouteLayersContextProvider>
              <LeafletMap />
            </RouteLayersContextProvider>
          </HashRouter>
        </Box>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
