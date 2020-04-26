import React, { useState, useRef } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  VKShareButton,
} from "react-share";
import { FacebookIcon, TwitterIcon, VKIcon } from "react-share";

import LinkShare from "../UI/LinkShare";
import ModalWindow from "../UI/ModalWindow";

export default ({ shareUrl, title, image }) => {
  const textAreaRef = useRef(null);
  const [showLink, setShowLink] = useState(false);
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(true);

    setTimeout(() => setModal(false), 1500);
  };

  const copyToClipboard = (e) => {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    handleModal();
  };

  return (
    <div className="share_panel__container">
      <div className="share_social-network__wrap">
        {modal ? (
          <ModalWindow text="Link copied!" />
        ) : !showLink ? (
          <>
            <FacebookShareButton url={shareUrl} quote={title}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} title={title}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <VKShareButton title={title} url={shareUrl} image={image}>
              <VKIcon size={32} round />
            </VKShareButton>
          </>
        ) : (
          <textarea
            ref={textAreaRef}
            value={shareUrl}
            onClick={copyToClipboard}
          />
        )}
      </div>
      <LinkShare handleShare={() => setShowLink(!showLink)} />
    </div>
  );
};
