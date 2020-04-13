import React from "react";
import classnames from "classnames";

export default ({ option, current, handleClick }) => {
  const classes = classnames({
    severity: true,
    on: option === current,
    [`${option}`]: true
  });
  return (
    <div className={classes} onClick={() => handleClick(option)}>
      {option}
    </div>
  );
};
