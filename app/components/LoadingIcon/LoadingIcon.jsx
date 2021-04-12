import styles from "./LoadingIcon.module.scss";
import classnames from "classnames";
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingIcon = () => {
  return <CircularProgress color="secondary" />;
};

export default LoadingIcon;
