import React from "react";
import classnames from "classnames";
import styles from "./withIconButton.module.scss";

const withIconButton = Icon => props => {
  const { className, disabled, onClick, onMouseDown, size = "medium" } = props;

  const iconClassNames = classnames(
    styles.withIconButton,
    { [className]: className },
    {
      //[styles.withIconButton__extra__small]: size === "extra-small",
      [styles.withIconButton__small]: size === "small",
      [styles.withIconButton__medium]: size === "medium"
      //[styles.withIconButton__large]: size === "large",
      //[styles.withIconButton__extra__large]: size === "extra-large"
    }
  );
  return (
    <button
      className={iconClassNames}
      onClick={onClick}
      onMouseDown={onMouseDown}
      disabled={disabled}
    >
      <Icon className={styles.withIconButton__component} size={size} />
    </button>
  );
};

export default withIconButton;
