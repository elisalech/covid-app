import React, { useState, useEffect } from "react";

const StatsGlobal = (props) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`/api/stats`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (!data) {
    return <div>Stats are loading...</div>;
  }

  const { updates, latest } = data;
  const date = latest.updated;

  return (
    <>
      <div className="global-stats">
        <div className="latest">
          <div className="confirmed">
            <p>{latest.confirmed}</p>
            <p>All confirmed cases</p>
          </div>
          <div className="recovered">
            <p>{latest.recovered}</p>
            <p>Recovered</p>
          </div>
          {/* <div className="deaths">
            <p>{latest.deaths}</p>
            <p>✝︎ Deaths</p>
          </div> */}
        </div>
        <div className="updates">
          {/* <div className="subtitle">Today</div> */}
          <div className="confirmed">
            <p>+{updates.confirmed}</p>
            <p></p>
          </div>
          <div className="recovered">
            <p>+{updates.recovered}</p>
            <p></p>
          </div>
          {/* <div className="deaths">
            <p>+{updates.deaths}</p>
            <p></p>
          </div> */}
        </div>
      </div>

      <p className="info">* {date}</p>
    </>
  );
};

export default StatsGlobal;
