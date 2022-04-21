import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { routes } from '@constants/constants';
import Location from './Location/Location';
import Diets from './Diets/Diets';
import { ReactComponent as Logo } from './Logo.svg';

import styles from './SettingUp.module.scss';

const STEPS = 2;

const SettingUpBase = (props) => {
  const { sessionId, userUid } = props;
  const baseUrl = `${window.location.protocol}//${window.location.host}`;

  const [step, setStep] = useState(1);
  const history = useHistory();

  // const dispatch = useDispatch();

  const goToNextStep = () => {
    if (step < STEPS) setStep(step + 1);
    else history.push(routes.SWIPE);
  };

  return (
    <section className={styles.SettingUp}>
      <a href={baseUrl}>
        <Logo className={styles.SettingUp__Logo} />
      </a>
      {step === 1 && <Location sessionId={sessionId} nextStep={goToNextStep} />}
      {step === 2 && <Diets sessionId={sessionId} userUid={userUid} nextStep={goToNextStep} />}
    </section>
  );
};

const mapStateToProps = ({ user: { sessionId, userUid } }) => ({
  sessionId,
  userUid,
});

SettingUpBase.defaultProps = {
  sessionId: '',
  userUid: '',
};

SettingUpBase.propTypes = {
  sessionId: PropTypes.string,
  userUid: PropTypes.string,
};

const SettingUp = connect(mapStateToProps)(SettingUpBase);
export default SettingUp;
