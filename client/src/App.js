import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import MapContainer from "./containers/MapContainer";
import InterfaceContainer from "./containers/InterfaceContainer.jsx";

import UserProvider from "./contexts/UserProvider";
import MapProvider from "./contexts/MapProvider";

const doc = document.documentElement;

function App() {
  const appHeight = () => {
    doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  };
  window.addEventListener("resize", appHeight);
  appHeight();

  return (
    <UserProvider>
      <MapProvider>
        <Router>
          <div id="app">
            <InterfaceContainer />
            <div id="map-container">
              <MapContainer />
            </div>
          </div>
        </Router>
      </MapProvider>
    </UserProvider>
  );
}

export default App;
