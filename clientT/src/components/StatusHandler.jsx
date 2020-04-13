import React from "react";
import classnames from "classnames";

export default ({ option, current, handleClick, id }) => {
  const classes = classnames({
    status: true,
    on: option === current,
    [`${option}`]: true
  });
  return (
    <div className={classes} onClick={() => handleClick(option, id)}>
      {option}
    </div>
  );
};
