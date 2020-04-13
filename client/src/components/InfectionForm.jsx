import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Severity from "./Severity";

const sevList = ["Low", "Medium", "High"];

const InfectionForm = ({ coords, handleSubmit, label, handleResize }) => {
  const [age, setAge] = useState(0);
  const [severity, setSeveruty] = useState(null);
  const history = useHistory();

  return (
    <form
      className="infection-form"
      onSubmit={e => handleSubmit(e, label, severity)}
    >
      <div className="field">
        <label htmlFor="coords" className="coords">
          Choose location on map <span></span>
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
        <label htmlFor="age">Age:</label>
        <div className="form-age">
          <input
            type="number"
            name="age"
            onChange={e => setAge(e.target.value)}
          />
          {age >= 60 ? <div className="high-risk">High risk</div> : null}
        </div>
      </div>

      <div className="field">
        <label htmlFor="severity">Severity:</label>
        <div className="severity-wrapper">
          {sevList.map((sev, i) => (
            <Severity
              key={i}
              option={sev}
              current={severity}
              handleClick={setSeveruty}
            />
          ))}
        </div>
      </div>

      <div className="field">
        <label htmlFor="symptoms">Symptoms:</label>
        <textarea
          name="symptoms"
          placeholder="Up to 100 characters"
          maxLength="100"
          id="symptoms"
          onChange={handleResize}
        ></textarea>
      </div>

      <div className="field">
        <label htmlFor="comment">Comment:</label>
        <textarea
          name="comment"
          placeholder="Up to 200 characters"
          maxLength="200"
          id="comment"
          onChange={handleResize}
        ></textarea>
      </div>

      <div className="buttons">
        <button type="button" onClick={() => history.push("/")}>
          Cancel
        </button>
        <button type="submit" onSubmit={e => handleSubmit(e, label, severity)}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default InfectionForm;
