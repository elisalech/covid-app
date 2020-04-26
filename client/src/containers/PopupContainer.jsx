import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import NotePopup from "../UI/NotePopup";
import MarkPopup from "../UI/MarkPopup";
import IsolationPopup from "../UI/IsolationPopup";
import MapProvider from "../contexts/MapProvider";
import getPosition from "../utils/getPosition";

const PopupContainer = ({ togglePopup }) => {
  const { selected, position } = useContext(MapProvider.context);
  const history = useHistory();

  if (!selected) return null;

  const isNote = selected.hasOwnProperty("note");
  const isMark = selected.hasOwnProperty("mark");
  const isIsolation = selected.hasOwnProperty("isolation");

  const [_left, _top] = position;
  const width = 300;
  const height = 390;

  const { left, top } = getPosition(_left, _top, width, height);

  return (
    <div
      className="popup__container"
      style={{ left, top, position: "absolute", width }}
    >
      {isNote && (
        <NotePopup
          position={position}
          togglePopup={togglePopup}
          selected={selected}
        />
      )}
      {isMark && (
        <MarkPopup
          position={position}
          togglePopup={togglePopup}
          selected={selected}
        />
      )}
      {isIsolation && (
        <IsolationPopup
          position={position}
          togglePopup={togglePopup}
          selected={selected}
          history={history}
        />
      )}
    </div>
  );
};

export default PopupContainer;
