import React, { useState } from "react";
import MarkDetails from "../UI/MarkDetails";

const SingleMark = ({ mark, handleCenter }) => {
  const [show, setShow] = useState(false);
  const isNote = mark.hasOwnProperty("status") ? false : true;

  const handleClick = e => {
    e.stopPropagation();
    setShow(!show);
  };

  return (
    <div className="collection-single-container">
      <div className="collection-single-header">
        <div className="single-date" onClick={handleClick}>
          {mark.date}
        </div>
        <div
          className={`single-status ${isNote ? "note-title" : mark.status}`}
          onClick={handleClick}
        >
          {isNote ? mark.title : mark.status}
        </div>
        <div className="single-location" onClick={handleCenter}></div>
      </div>
      {show && <MarkDetails mark={mark} />}
    </div>
  );
};
export default SingleMark;

// {isNote ? null : (
//   <div className={`single-status ${mark.status}`} onClick={handleClick}>
//     {mark.status}
//   </div>
// )}
