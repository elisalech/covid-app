import React, { useState, useEffect } from "react";
import squareicon from "squareicon";

export default ({ avatarId }) => {
  const [avaData, setAvaData] = useState(null);
  useEffect(() => {
    squareicon(
      { id: avatarId, pixels: 14, symmetry: "central", padding: 0 },
      (err, data) => {
        setAvaData(data);
      }
    );
  }, [avatarId]);

  return <img className="user-avatar" src={avaData} />;
};
