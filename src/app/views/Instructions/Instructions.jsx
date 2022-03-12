import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import colors from '@constants/colors.constants';
import { logTutorialBegin, logTutorialComplete } from '@services/googleAnalytics.service';
import Layout from '../../components/Layout/Layout';
import styles from './Instructions.module.scss';
import Step1 from './png/1Step.webp';
import Step2 from './png/2Step.webp';
import Step3 from './png/3Step.webp';
import Step4 from './png/4Step.webp';
import Step5 from './png/5Step.webp';

const { red, deepChampagne } = colors;

const useStyles = makeStyles({
  root: {
    backgroundColor: 'transparent',
  },
  dots: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    backgroundColor: deepChampagne[500],
    height: '12px',
    width: '12px',
    marginLeft: '12px',
  },
  dotActive: {
    backgroundColor: red[500],
  },
});

const Instructions = (props) => {
  const { onClose, onCloseAndNeverShowAgain } = props;
  const classes = useStyles();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step > 4) {
      logTutorialComplete();
      onClose();
    }
  }, [onClose, step]);

  useEffect(() => {
    logTutorialBegin();
  }, []);

  const nextStep = () => {
    setStep((prevState) => prevState + 1);
  };

  const steps = [
    <img src={Step1} alt="instructions first step" />,
    <img src={Step2} alt="instructions second step" />,
    <img src={Step3} alt="instructions third step" />,
    <img src={Step4} alt="instructions fourth step" />,
    <img src={Step5} alt="instructions fifth step" />,
  ];

  return (
    <Layout>
      <main className={styles.Instructions}>
        <div className={styles.Instructions__Body}>
          <h1 className={styles.Instructions__Body__Title}>¿Cómo es la vuelta?</h1>
          <h2 className={styles.Instructions__Body__Subtitle}>(Instrucciones de uso)</h2>
          <div className={styles.Instructions__Body__Stepper}>
            <MobileStepper
              variant="dots"
              steps={5}
              position="static"
              activeStep={step}
              classes={classes}
            />
          </div>
          <button
            type="button"
            className={styles.Instructions__Body__Instruction}
            onClick={nextStep}
          >
            {steps[step]}
          </button>
          <div className={styles.Instructions__Buttons}>
            <div className={styles.Instructions__Buttons__Close}>
              <button type="button" onClick={onClose}>
                Cerrar
              </button>
              <button type="button" onClick={onCloseAndNeverShowAgain}>
                Cerrar y no mostrar de nuevo
              </button>
            </div>
            <button
              type="button"
              onClick={nextStep}
              className={cx({
                [styles.Instructions__Buttons__Next]: step !== 4,
                [styles.Instructions__Buttons__End]: step === 4,
              })}
            >
              {step < 4 ? 'Siguiente' : '¡Listo pues!'}
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
};

Instructions.defaultProps = {
  onCloseAndNeverShowAgain: () => {},
  onClose: () => {},
};

Instructions.propTypes = {
  onClose: PropTypes.func,
  onCloseAndNeverShowAgain: PropTypes.func,
};

export default Instructions;
