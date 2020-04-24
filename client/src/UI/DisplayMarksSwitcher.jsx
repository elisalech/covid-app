import React, { useContext } from "react";

import Toggle from "react-toggle";
import "react-toggle/style.css";
import "../styles/DisplayMarksSwitcher.scss";

import MapProvider from "../contexts/MapProvider";

const DisplayMarksSwitcher = () => {
  const { toggleMode } = useContext(MapProvider.context);

  return (
    <div className="marks-switcher__wrapper">
      <Toggle
        // defaultChecked={true}
        icons={{
          checked: <span>Case/info marks</span>,
          unchecked: <span>Isolation marks</span>,
        }}
        onChange={toggleMode}
      />
    </div>
  );
};

export default DisplayMarksSwitcher;
