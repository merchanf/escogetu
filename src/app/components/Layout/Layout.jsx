import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Layout.module.scss';

const Layout = ({ className, children }) => {
  return <div className={classnames(className, styles.Layout)}>{children}</div>;
};

Layout.defaultProps = {
  className: '',
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Layout;
