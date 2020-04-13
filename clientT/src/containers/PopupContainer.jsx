import React, { useContext } from "react";

import NotePopup from "../UI/NotePopup";
import MarkPopup from "../UI/MarkPopup";
import MapProvider from "../contexts/MapProvider";

const PopupContainer = ({ togglePopup }) => {
  const { selected, position } = useContext(MapProvider.context);
  if (!selected) return null;

  const isNote = selected.hasOwnProperty("note") === true;

  const [_left, _top] = position;
  const width = 300;
  const height = 240;

  const { left, top } = getPosition(_left, _top, width, height);

  return (
    <div
      className="popup__container"
      style={{ left, top, position: "absolute", width }}
    >
      {isNote ? (
        <NotePopup
          position={position}
          togglePopup={togglePopup}
          selected={selected}
        />
      ) : (
        <MarkPopup
          position={position}
          togglePopup={togglePopup}
          selected={selected}
        />
      )}
    </div>
  );
};

export default PopupContainer;

function getPosition(left, top, width, height) {
  const wWidth = window.innerWidth;
  const wHeight = window.innerHeight;

  left = wWidth - left > width ? left : left - width;
  top = wHeight - top > height ? top : top - height;

  return { left, top };
}
