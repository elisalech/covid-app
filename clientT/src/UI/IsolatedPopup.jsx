import React from "react";
import { Link } from "react-router-dom";

import Avatar from "./Avatar";

const IsolatedPopup = ({ togglePopup, selected }) => {
  const { isolated } = selected;
  const { author, date, description, coords, title } = isolated;

  return (
    <>
      <header className="popup__header">
        <div className="left">
          <Link to={`/user/${author}`}>
            <Avatar avatarId={author} />
          </Link>
          <h3>Info, {date}</h3>
        </div>
        <div className="popup-close" onClick={() => togglePopup(false)}></div>
      </header>

      <div className="popup__content">
        <p className="popup-coords">{`${coords.lat} ${coords.lng}`}</p>
        <ul>
          <li className="popup-comment">Title: {title}</li>
          <li className="popup-comment">Description: {description}</li>
        </ul>
      </div>
    </>
  );
};

export default IsolatedPopup;
