import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { setDiets } from '@actions/user.actions';
import { Button, MultiSelect, CircularProgress } from '@components/index';
import { fetchDietsList } from '@app/services/firestore.service';

import styles from './Diets.module.scss';

const Diets = (props) => {
  const { sessionId, userUid, nextStep } = props;

  const dispatch = useDispatch();

  const [text, setText] = useState('No, niguna');
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [optionsLoading, setOptionsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (selectedDiets.length > 0) {
      setText('Siguiente');
    } else {
      setText('No, niguna');
    }
  }, [selectedDiets]);

  useEffect(() => {
    setOptionsLoading(true);
    fetchDietsList(setOptions, setOptionsLoading);
  }, []);

  const handleOnchange = (diets) => {
    setSelectedDiets(diets);
  };

  const handleOnClick = () => {
    dispatch(setDiets(sessionId, userUid, selectedDiets));
    nextStep();
  };

  return (
    <section className={styles.Diets}>
      <h1> ¿Tienes alguna preferencia o restricción alimenticia?</h1>
      <h2> Puedes escoger varias opciones (o ninguna) </h2>
      {optionsLoading ? (
        <CircularProgress />
      ) : (
        <MultiSelect options={options} onChange={handleOnchange} />
      )}

      <Button className={styles.Diets__NextStep} onClick={handleOnClick}>
        {text}
      </Button>
    </section>
  );
};

Diets.defaultProps = {
  sessionId: '',
  userUid: '',
  nextStep: () => {},
};

Diets.propTypes = {
  sessionId: PropTypes.string,
  userUid: PropTypes.string,
  nextStep: PropTypes.func,
};

export default Diets;
