import React from "react";

import errorPick from "../assets/error-img.png";

const ImagePreview = ({ previewUrl, width, height, handleError }) => {
  if (!previewUrl) return null;

  return (
    <img
      src={previewUrl}
      width={width && width}
      height={height && height}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = errorPick;
        handleError && handleError();
      }}
      //   onError={(e) => console.log(e)}
      alt="preview"
    />
  );
};

export default ImagePreview;
