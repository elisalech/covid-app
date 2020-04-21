import React, { useState, useContext } from "react";
import MapReact from "../components/MapReact";
import MapProvider from "../contexts/MapProvider";
import PopupContainer from "./PopupContainer";

const MapContainer = () => {
  const {
    setCoords,
    marks,
    notes,
    isolations,
    placemark,
    getSelected,
    setPosition,
    center,
    meIsolation,
  } = useContext(MapProvider.context);
  const [isPopup, setIsPopup] = useState(false);

  if (!marks || !notes) return null;

  return (
    <>
      <MapReact
        handlePosition={setPosition}
        placemark={placemark}
        marks={marks}
        notes={notes}
        isolations={isolations}
        meIsolation={meIsolation}
        handlePopup={setIsPopup}
        handleClickGetCoords={setCoords}
        getSelected={getSelected}
        center={center}
      />
      {isPopup && <PopupContainer togglePopup={setIsPopup} />}
    </>
  );
};

export default MapContainer;
