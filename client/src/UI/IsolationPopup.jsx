import React from "react";
import { Link } from "react-router-dom";

import Avatar from "./Avatar";
import ImagePreview from "./ImagePreview";

const IsolationPopup = ({ togglePopup, selected }) => {
  const { isolation } = selected;
  const { author, date, comment, coords, image } = isolation;

  return (
    <>
      <header className="popup__header">
        <div className="left">
          <Link to={`/user/${author}`}>
            <Avatar avatarId={author} />
          </Link>
          <h3>On isolation, {date}</h3>
        </div>
        <div className="popup-close" onClick={() => togglePopup(false)}></div>
      </header>

      <div className="popup__content">
        <p className="popup-coords">{`${coords.lat} ${coords.lng}`}</p>
        <ul>
          <li className="popup-comment">{comment}</li>
        </ul>
        <ImagePreview
          width="248"
          height=""
          //   previewUrl={"http://localhost:5000/" + image}
          previewUrl={image}
        />
      </div>
    </>
  );
};

export default IsolationPopup;
