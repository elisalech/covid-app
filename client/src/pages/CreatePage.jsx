import React, { useContext, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

import InfectionForm from "../components/InfectionForm";
import NoteForm from "../components/NoteForm";
import MapProvider from "../contexts/MapProvider";
import IsolatedForm from "../components/IsolatedForm";

const CreatePage = () => {
  const { coords, setPlacemark } = useContext(MapProvider.context);
  const history = useHistory();
  const location = useLocation().pathname;

  useEffect(() => {
    setPlacemark(true);

    return () => setPlacemark(false);
  }, []);

  const handleNewPoint = (formData, label) => {
    fetch(`/api/${label}/new`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Credentials": true,
      },
      body: formData,
    }).then((res) => history.push("/"));
  };

  const handleResize = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubmit = (e, label, optional) => {
    e.preventDefault();

    const form = e.target;
    let formData = new FormData(form);
    const optionalData = Object.entries(optional)[0];
    formData.append(optionalData[0], optionalData[1]);

    handleNewPoint(formData, label);
  };

  let form;
  let title;

  if (location.includes("note/new")) {
    form = (
      <NoteForm
        label="note"
        handleNewPoint={handleNewPoint}
        handleSubmit={handleSubmit}
        handleResize={handleResize}
        coords={coords ? coords.join(",") : null}
      />
    );
    title = "Adding new info point";
  }
  if (location.includes("isolation/new")) {
    form = (
      <IsolatedForm
        label="isolated"
        handleNewPoint={handleNewPoint}
        handleSubmit={handleSubmit}
        handleResize={handleResize}
        coords={coords ? coords.join(",") : null}
      />
    );
    title = "Your Isolation";
  }
  if (location.includes("mark/new")) {
    form = (
      <InfectionForm
        label="mark"
        handleNewPoint={handleNewPoint}
        handleSubmit={handleSubmit}
        handleResize={handleResize}
        coords={coords ? coords.join(",") : null}
      />
    );
    title = "Adding new infection case";
  }

  return (
    <div className="create-page__container">
      <div className="create-page__header">
        <h2 className="create-page__title">{title}</h2>
        <p className="create-page__description">
          Tell us a bit about feellings so that we provide with more
          information.
        </p>
      </div>
      <div className="create-page__form-wrapper"></div>
      {form}
    </div>
  );
};

export default CreatePage;
