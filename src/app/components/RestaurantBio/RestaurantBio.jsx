import React from 'react';

import PropTypes from 'prop-types';
import styles from './RestaurantBio.module.scss';

const RestaurantBio = ({ name, open, setOpen }) => {
  return (
    <>
      {open ? (
        <div className={styles.Bio}>
          <div className={styles.Bio__button}>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
              }}
              className={styles.Bio__Button__Button}
            >
              X
            </button>
          </div>
          <h2 className={styles.Bio__Name}>{name}</h2>
        </div>
      ) : null}
    </>
  );
};
RestaurantBio.propTypes = {
  name: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default RestaurantBio;
