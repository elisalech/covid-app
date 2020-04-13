import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import ImageUpload from "./ImageUpload";

const IsolatedForm = ({ coords, handleSubmit, label, handleResize }) => {
  const history = useHistory();
  const [image, setImage] = useState(null);

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
        <button type="submit" onSubmit={(e) => handleSubmit(e, label, null)}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default IsolatedForm;
