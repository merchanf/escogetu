import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import styles from './RestaurantBio.module.scss';

const RestaurantBio = ({ name, open, setOpen, bio }) => {
  const [text, setText] = useState();

  useEffect(() => {
    if (bio.length > 1500) setText(`${bio.slice(0, 1500)}...`);
    else setText(bio);
  }, [bio]);

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
          <p className={styles.Bio__Text}>{text}</p>
        </div>
      ) : null}
    </>
  );
};
RestaurantBio.propTypes = {
  name: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  bio: PropTypes.string.isRequired,
};

export default RestaurantBio;
