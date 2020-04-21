import React, { createContext, useState, useEffect } from "react";

const context = createContext(null);

const MapProvider = ({ children }) => {
  const [coords, setCoords] = useState(null);
  const [marks, setMarks] = useState(null);
  const [notes, setNotes] = useState(null);
  const [isolations, setIsolations] = useState(null);
  const [placemark, setPlacemark] = useState(false);
  const [selected, setSelected] = useState(null);
  const [position, setPosition] = useState(null);
  const [center, setCenter] = useState(null);
  const [meIsolation, setMeIsolation] = useState(false);

  const getNotes = () => {
    fetch(`/api/note/all`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((res) => res.json())
      .then((data) => setNotes(data.notes));
  };

  const getMarks = () => {
    fetch(`/api/mark/all`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((res) => res.json())
      .then((data) => setMarks(data.marks));
  };

  const getIsolations = () => {
    fetch(`/api/isolation/all`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((res) => res.json())
      .then((data) => setIsolations(data.isolations));
  };

  const getSelected = (id, label) => {
    fetch(`/api/${label}/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((res) => res.json())
      .then((data) => setSelected(data));
  };

  useEffect(() => {
    getNotes();
    getMarks();
    getIsolations();
  }, []);

  return (
    <context.Provider
      value={{
        coords,
        setCoords,
        marks,
        notes,
        placemark,
        setPlacemark,
        getSelected,
        selected,
        setPosition,
        position,
        center,
        setCenter,
        meIsolation,
        setMeIsolation,
        isolations,
      }}
    >
      {children}
    </context.Provider>
  );
};

MapProvider.context = context;

export default MapProvider;
