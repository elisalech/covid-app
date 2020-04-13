import React from "react";

export default () => {
  const switchHandler = () => {
    const toHide = document.querySelector(".interface-container");
    toHide.classList.toggle("closed");
  };
  return (
    <div className="interface-switcher" onClick={switchHandler}>
      <div className="switcher-icon"></div>
    </div>
  );
};
