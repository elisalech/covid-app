import React from "react";
import { useHistory } from "react-router-dom";

const NoteForm = ({ coords, handleSubmit, label, handleResize }) => {
  const history = useHistory();

  return (
    <form className="note-form" onSubmit={e => handleSubmit(e, label, null)}>
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
        <label htmlFor="title" className="title">
          Short title:
        </label>
        <input
          type="text"
          name="title"
          placeholder="Up to 20 characters"
          maxlength="20"
          id="title"
        />
      </div>

      <div className="field">
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          id="description"
          placeholder="Up to 200 characters"
          maxLength="200"
          onChange={handleResize}
        ></textarea>
      </div>

      <div className="buttons">
        <button type="button" onClick={() => history.push("/")}>
          Cancel
        </button>
        <button type="submit" onSubmit={e => handleSubmit(e, label, null)}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
