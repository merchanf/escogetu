import styles from "./Layout.module.scss";
import classnames from "classnames";

const Layout = ({ children, background = "Light" }) => {
  return (
    <div
      className={classnames(styles.Layout, {
        [styles[`Layout__${background}`]]: background,
      })}
    >
      {children}
    </div>
  );
};

export default Layout;
