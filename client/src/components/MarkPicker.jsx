import React, { useState } from "react";
import { Link } from "react-router-dom";

const MarkPicker = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mark-picker__container">
      {open && (
        <div className="picker-wrapper">
          <Link to="/mark/new">
            <div className="picker-infection picker noselect">
              <div className="infection-icon icon"></div>
              <p>Infection</p>
            </div>
          </Link>
          <Link to="/note/new">
            <div className="picker-note picker noselect">
              <div className="note-icon icon"></div>
              <p>Info note</p>
            </div>
          </Link>
        </div>
      )}
      <div className="picker-opener noselect" onClick={() => setOpen(!open)}>
        <div className="open-icon"></div>
        <p> New point</p>
      </div>
    </div>
  );
};

export default MarkPicker;
