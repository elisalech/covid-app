import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import MapProvider from "../contexts/MapProvider";

export default ({ match }) => {
  const {
    setIsolationMode,
    getSelected,
    setCenter,
    selected,
    setPosition,
    setIsPopup,
  } = useContext(MapProvider.context);
  const history = useHistory();

  //   if (!selected) return null;

  useEffect(() => {
    // window.addEventListener("DOMContentLoaded", (e) => console.log(e));
    // window.addEventListener("DOMContentLoaded", () => {
    //   console.log("dafghrfdsafghd");
    pageInit();
    // });

    // return () => document.removeEventListener("DOMContentLoaded", pageInit);
  });

  useEffect(() => {
    if (!selected) return;
    if (selected.isolation) {
      const width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      const height =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;

      const { coords } = selected.isolation;
      setCenter(coords);
      setPosition([width / 2, height / 2]);
      console.log("AFTER setPosition([width / 2, height / 2]);");
      setIsPopup(true);
    }
    history.push("/");
  }, [selected]);

  const pageInit = () => {
    const { iid } = match.params;
    setIsolationMode(true);
    getSelected(iid, "isolation");
    console.log("ASDDSAFSAXD");
  };

  return (
    <div className="user-page__container">
      <div className="user-page__header">
        <Link to="/" title="home page">
          <div className="control-home"></div>
        </Link>
      </div>
    </div>
  );
};
