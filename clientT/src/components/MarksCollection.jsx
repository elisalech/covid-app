import React, { useContext, useEffect, useState } from "react";

import MapProvider from "../contexts/MapProvider";
import SingleMark from "./SingleMark";

const MarksCollection = ({ marks, title }) => {
  const { setCenter } = useContext(MapProvider.context);
  const [show, setShow] = useState(false);

  const count = marks.length > 0 ? marks.length : "No";
  const markList = marks.map((m, i) => {
    return (
      <SingleMark key={i} mark={m} handleCenter={() => setCenter(m.coords)} />
    );
  });
  return (
    <>
      <div className="collection-title-wrapper" onClick={() => setShow(!show)}>
        <h4>
          <span className={`toggle ${show ? "down" : null}`}></span> {title}
        </h4>
        <p>{count}</p>
      </div>
      {show && <div className="collection-list-wrapper">{markList}</div>}
    </>
  );
};

export default MarksCollection;
