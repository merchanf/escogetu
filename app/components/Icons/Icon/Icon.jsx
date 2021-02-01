import React from "react";
import classnames from "classnames";

import styles from "./Icon.module.scss";

const Icon = ({ className, svg, size }) => {
  const iconClassNames = classnames(
    styles.Icon,
    { [className]: className },
    {
      [styles.Icon__extra__small]: size === "extra-small",
      [styles.Icon__small]: size === "small",
      [styles.Icon__medium]: size === "medium",
      [styles.Icon__large]: size === "large",
      [styles.Icon__extra__large]: size === "extra-large"
    }
  );

  return <div className={iconClassNames}>{svg}</div>;
};

Icon.defaultProps = {
  size: "medium"
};

export default Icon;
