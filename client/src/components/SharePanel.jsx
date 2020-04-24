import React, { useState } from "react";

import {
  FacebookShareButton,
  TwitterShareButton,
  VKShareButton,
} from "react-share";
import { FacebookIcon, TwitterIcon, VKIcon } from "react-share";

export default ({ shareUrl, title, image }) => {
  return (
    <div className="share_panel__container">
      <div className="share_social-network__wrap">
        <FacebookShareButton
          url={shareUrl}
          quote={title}
          className="Demo__some-network__share-button"
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton
          url={shareUrl}
          title={title}
          className="Demo__some-network__share-button"
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <VKShareButton
          title={title}
          url={shareUrl}
          image={image}
          className="Demo__some-network__share-button"
        >
          <VKIcon size={32} round />
        </VKShareButton>
      </div>
    </div>
  );
};
