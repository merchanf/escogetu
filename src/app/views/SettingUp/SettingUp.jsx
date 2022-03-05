import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';

import Location from './Location/Location';

import styles from './SettingUp.module.scss';

const SettingUpBase = (props) => {
  // const history = useHistory();
  const { sessionId } = props;

  // const dispatch = useDispatch();

  return (
    <section className={styles.SettingUp}>
      <Location sessionId={sessionId} />
    </section>
  );
};

const mapStateToProps = ({ user: { sessionId } }) => ({
  sessionId,
});

SettingUpBase.defaultProps = {
  sessionId: '',
};

SettingUpBase.propTypes = {
  sessionId: PropTypes.string,
};

const SettingUp = connect(mapStateToProps)(SettingUpBase);
export default SettingUp;
