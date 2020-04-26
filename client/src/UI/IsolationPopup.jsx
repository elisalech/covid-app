import React from "react";
import { Link } from "react-router-dom";

import Avatar from "./Avatar";
import ImagePreview from "./ImagePreview";
import SharePanel from "../components/SharePanel";

const IsolationPopup = ({ togglePopup, selected, history }) => {
  const { isolation } = selected;
  const id = isolation._id;

  const { author, date, comment, coords, image } = isolation;
  const shareUrl = "https://pointc19.com/isolation/" + id;
  console.log(shareUrl);

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
        <ImagePreview width="270" height="" previewUrl={image} />
        <SharePanel title={comment} shareUrl={shareUrl} image={image} />
      </div>
    </>
  );
};

export default IsolationPopup;
