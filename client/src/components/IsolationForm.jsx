import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import ImageUpload from "./ImageUpload";
import MapProvider from "../contexts/MapProvider";
import getLocation from "../utils/getLocation";

const IsolationForm = ({ coords, handleSubmit, label, handleResize }) => {
  const { setCenter, setCoords, setMeIsolation } = useContext(
    MapProvider.context
  );
  const history = useHistory();
  const [image, setImage] = useState(null);
  const [me, setMe] = useState(null);

  useEffect(() => {
    setMeIsolation(true);
    getLocation(handleLocation);
  }, []);

  const handleLocation = ({ coords }) => {
    const { latitude, longitude } = coords;
    const meCoords = { lat: latitude, lng: longitude };
    setMe(meCoords);
    setCoords([meCoords.lat, meCoords.lng]);
    setCenter(meCoords);
  };

  return (
    <form
      className="isolated-form"
      onSubmit={(e) => handleSubmit(e, label, { image })}
    >
      <div className="field">
        <label htmlFor="coords" className="coords">
          Choose location on map{" "}
        </label>
        <input
          type="text"
          name="coords"
          id="coords"
          value={coords || ""}
          readOnly
        />
      </div>

      <div className="field">
        <label htmlFor="comment">Leave a comment:</label>
        <textarea
          name="comment"
          id="comment"
          placeholder="Up to 200 characters"
          maxLength="200"
          onChange={handleResize}
        ></textarea>
      </div>

      <ImageUpload onInput={setImage} />
      <div className="buttons">
        <button type="button" onClick={() => history.push("/")}>
          Cancel
        </button>
        <button
          type="submit"
          onSubmit={(e) => handleSubmit(e, label, { image })}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default IsolationForm;
