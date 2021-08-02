import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Layout.module.scss';

const Layout = ({ children, background }) => {
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

Layout.defaultProps = {
  background: 'Light',
};

Layout.propTypes = {
  background: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Layout;
