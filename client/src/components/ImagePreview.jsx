import React from "react";

import errorPick from "../assets/icons/google-logo.svg";

const ImageUpload = ({ previewUrl, width, height, handleError }) => {
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

export default ImageUpload;
