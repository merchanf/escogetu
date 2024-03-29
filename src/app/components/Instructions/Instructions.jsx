/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import { useStore, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  withTextIcon,
  SwipeLeftIcon,
  SwipeRightIcon,
  CurvedArrow,
  CrossIcon,
} from '@components/Icons/Icons';
import { setInstructionsAlreadyShown } from '@app/redux/actions/session.action';
import { Layout } from '@components/index';

import styles from './Instructions.module.scss';

const SwipeLeftIconText = withTextIcon(SwipeLeftIcon);
const SwipeRightIconText = withTextIcon(SwipeRightIcon);

const Instructions = ({ className }) => {
  const {
    hydrate: {
      application: { instructionsAlreadyShown },
    },
  } = useStore().getState();
  const dispatch = useDispatch();
  const INSTRUCTIONS_LOCALSTORAGE_KEY = 'instructionsShownV2.0';
  const shouldShowInstructions = localStorage.getItem(INSTRUCTIONS_LOCALSTORAGE_KEY);
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const onClick = () => {
    if (isChecked) {
      localStorage.setItem(INSTRUCTIONS_LOCALSTORAGE_KEY, 'true');
    }
    dispatch(setInstructionsAlreadyShown(true));
    setIsOpen(false);
  };

  const onChange = () => {
    setIsChecked(!isChecked);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    setIsOpen(!shouldShowInstructions && !instructionsAlreadyShown);
  }, [instructionsAlreadyShown, shouldShowInstructions]);

  return (
    isOpen && (
      <div className={cx(styles.Instructions, className)} onClick={onClick}>
        <Layout className={styles.Instructions__Layout}>
          <div className={styles.Instructions__Layout__DontShowAgain}>
            <input
              className={styles.Instructions__Layout__DontShowAgain__Checkbox}
              id="dontShowAgain"
              type="checkbox"
              onClick={stopPropagation}
              onChange={onChange}
            />
            <label
              htmlFor="dontShowAgain"
              className={styles.Instructions__Layout__DontShowAgain__Text}
              onClick={stopPropagation}
            >
              <span onClick={stopPropagation} />
              No mostrar de nuevo
            </label>
          </div>
          <button type="button" className={styles.Instructions__Layout__Close}>
            <CrossIcon className={styles.Instructions__Layout__Close__Icon} size="small" />
          </button>
          <div className={styles.Instructions__Layout__NextPicture}>
            <p className={styles.Instructions__Layout__NextPicture__Text}>¡Quiero ver más fotos!</p>
            <CurvedArrow className={styles.Instructions__Layout__NextPicture__Icon} />
          </div>
          <div className={styles.Instructions__Layout__Share}>
            <p className={styles.Instructions__Layout__Share__Text}>
              ¿Vas en parche? busca restaurante con tus amigos
            </p>
            <CurvedArrow className={styles.Instructions__Layout__Share__Icon} />
          </div>
          <div className={styles.Instructions__Layout__NextPicture}>
            <p className={styles.Instructions__Layout__NextPicture__Text}>¡Quiero ver más fotos!</p>
            <CurvedArrow className={styles.Instructions__Layout__NextPicture__Icon} />
          </div>
          <div className={styles.Instructions__Layout__Wrapper}>
            <div className={styles.Instructions__Layout__Wrapper__Column}>
              <SwipeLeftIconText
                className={styles.IconText}
                caption="¿No te gusta este restaurante?, Desliza a la izquierda"
                iconStyle={styles.IconText__Icon}
              />
            </div>
            <div className={styles.Instructions__Layout__Wrapper__DottedSpaced} />
            <div className={cx(styles.Instructions__Layout__Wrapper__Column)}>
              <SwipeRightIconText
                className={styles.IconText}
                caption="¿te gusta lo que ves?, Desliza a la derecha"
                iconStyle={styles.IconText__Icon}
              />
            </div>
          </div>
        </Layout>
      </div>
    )
  );
};

Instructions.propTypes = {
  className: PropTypes.string,
};

Instructions.defaultProps = {
  className: '',
};

export default Instructions;
