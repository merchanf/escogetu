import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { withTextIcon, SwipeLeftIcon, SwipeRightIcon, CurvedArrow } from '@components/Icons/Icons';
import { Layout } from '@components/index';

import styles from './Instructions.module.scss';

const SwipeLeftIconText = withTextIcon(SwipeLeftIcon);
const SwipeRightIconText = withTextIcon(SwipeRightIcon);

const Instructions = ({ className }) => {
  const shouldShowInstructions = localStorage.getItem('instructionsShown');
  const [isOpen, setIsOpen] = useState(!shouldShowInstructions);

  const onClick = () => {
    localStorage.setItem('instructionsShown', 'true');
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className={cx(styles.Instructions, className)} onClick={onClick}>
        <Layout className={styles.Instructions__Layout}>
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
          <div className={styles.Instructions__Layout__Wrapper}>
            <div className={styles.Instructions__Layout__Wrapper__Column}>
              <SwipeLeftIconText
                className={styles.IconText}
                caption="No me gusta este restaurante, ¡Siguiente!"
                iconStyle={styles.IconText__Icon}
              />
            </div>
            <div className={styles.Instructions__Layout__Wrapper__DottedSpaced} />
            <div className={cx(styles.Instructions__Layout__Wrapper__Column)}>
              <SwipeRightIconText
                className={styles.IconText}
                caption="¡Me gusta lo que veo!"
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
