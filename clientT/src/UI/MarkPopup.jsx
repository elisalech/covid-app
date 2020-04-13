import React from "react";
import { Link } from "react-router-dom";

import Avatar from "./Avatar";

const MarkPopup = ({ togglePopup, selected }) => {
  const { mark } = selected;
  const {
    author,
    date,
    severity,
    age,
    comment,
    status,
    symptoms,
    coords
  } = mark;

  return (
    <>
      <header className="popup__header">
        <div className="left">
          <Link to={`/user/${author}`}>
            <Avatar avatarId={author} />
          </Link>
          <h3>Infection, {date}</h3>
        </div>
        <div className="popup-close" onClick={() => togglePopup(false)}></div>
      </header>
      <div className="popup__content">
        <p className="popup-coords">{`${coords.lat} ${coords.lng}`}</p>
        <ul>
          <li className="popup-age">Age: {age}</li>
          <li className="popup-severity">Status: {status}</li>
          <li className="popup-severity">Severity: {severity}</li>
          <li className="popup-symptoms">Symptoms: {symptoms}</li>
          <li className="popup-comment">Comment: {comment}</li>
        </ul>
      </div>
    </>
  );
};

export default MarkPopup;
