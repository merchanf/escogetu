import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { useHistory } from 'react-router-dom';

import Location from './Location/Location';
import { ReactComponent as Logo } from './Logo.svg';

import styles from './SettingUp.module.scss';

const SettingUpBase = (props) => {
  const { sessionId } = props;

  const [step, setStep] = useState(1);
  // const history = useHistory();

  // const dispatch = useDispatch();

  const goToNextStep = () => {
    setStep(step + 1);
  };

  return (
    <section className={styles.SettingUp}>
      <Logo className={styles.SettingUp__Logo} />
      {step === 1 && <Location sessionId={sessionId} nextStep={goToNextStep} />}
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
