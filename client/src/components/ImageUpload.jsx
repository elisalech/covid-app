import React, { useRef, useState, useEffect } from "react";

import ImagePreview from "../UI/ImagePreview";

const ImageUpload = ({ onInput }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(null);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    onInput(pickedFile, fileIsValid);
  };

  const externalImgHandler = (e) => {
    setIsValid(false);
    setFile(null);
    onInput(null);
    setPreviewUrl(e.target.value);

    if (!e.target.value) return;
    setIsValid(true);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const handleError = () => {
    setIsValid(false);
  };

  return (
    <div className="field">
      <label>Choose an image:</label>
      <div className="image-upload">
        <input
          // id={props.id}
          ref={filePickerRef}
          style={{ display: "none" }}
          type="file"
          accept=".jpg,.png,.jpeg"
          onChange={pickedHandler}
        />
        <div className="icon"></div>
        <div onClick={pickImageHandler}>Pick an image</div>
        {isValid === false && null}
      </div>
      <div className="field">
        <label htmlFor="externalImage" className="small">
          Or paste a link to an image:
        </label>
        <input
          type="text"
          name="externalImage"
          id="externalImage"
          onChange={externalImgHandler}
        />
      </div>
      <div className="image-upload__preview">
        {previewUrl && (
          <ImagePreview
            width="248"
            height=""
            previewUrl={previewUrl}
            handleError={handleError}
          />
        )}
        {/* {!previewUrl && <p>preview description</p>} */}
      </div>
    </div>
  );
};

export default ImageUpload;
