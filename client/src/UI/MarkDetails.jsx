import React, { useContext, useState } from "react";

import UserProvider from "../contexts/UserProvider";
import StatusHandler from "../components/StatusHandler";

const statusList = ["Infected", "Recovered", "Death"];

const MarkDetails = ({ mark }) => {
  const [show, setShow] = useState(false);
  const { userData, updateStatus } = useContext(UserProvider.context);
  const isNote = mark.hasOwnProperty("status") ? false : true;

  const parsedMark = JSON.parse(JSON.stringify(mark));

  delete parsedMark["author"];
  delete parsedMark["__v"];
  delete parsedMark["_id"];
  delete parsedMark["coords"];

  let parsedArray = Object.entries(parsedMark);
  if (!isNote) parsedArray.unshift(parsedArray.splice(4, 1)[0]);

  const isAuthor = userData.authenticated && userData.user._id === mark.author;

  const detailsList = parsedArray.map((det, i) => {
    if (det[0] === "status") {
      return (
        <div key={i} className={`detail ${det[0]}-wrapper`}>
          <p className="detail-title">{det[0]}:</p>
          <div className="detail-value">
            {isAuthor
              ? statusList.map((s, i) => (
                  <StatusHandler
                    key={i}
                    handleClick={updateStatus}
                    id={mark._id}
                    option={s}
                    current={det[1]}
                  />
                ))
              : det[1]}
          </div>
        </div>
      );
    }
    return (
      <div key={i} className={`detail ${det[0]}-wrapper`}>
        <p className="detail-title">{det[0]}:</p>
        <p className="detail-value">{det[1]}</p>
      </div>
    );
  });

  return <div className="collection-single-details">{detailsList}</div>;
};
export default MarkDetails;
