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
    isolationMode,
    isPopup,
    setIsPopup,
  } = useContext(MapProvider.context);

  if (!marks || !notes) return null;

  return (
    <>
      <MapReact
        handlePosition={setPosition}
        placemark={placemark}
        marks={marks}
        notes={notes}
        isolationMode={isolationMode}
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
