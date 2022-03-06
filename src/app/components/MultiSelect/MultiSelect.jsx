import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { ToggleButton } from '../index';

import styles from './MultiSelect.module.scss';

const MultiSelect = (props) => {
  const { className, onChange, options } = props;
  const [selected, setSelected] = useState([]);

  const handleOnToggle = (isActive, value) => {
    if (isActive) {
      setSelected([...selected, value]);
    } else {
      setSelected(selected.filter((item) => item !== value));
    }
  };

  useEffect(() => {
    onChange(selected);
  }, [onChange, selected]);

  return (
    <div className={cx(styles.MultiSelect, className)}>
      {options.map((option) => (
        <ToggleButton key={option} className={styles.MultiSelect__Button} onToggle={handleOnToggle}>
          {option}
        </ToggleButton>
      ))}
    </div>
  );
};

MultiSelect.defaultProps = {
  className: '',
  onChange: () => {},
  options: [],
};

MultiSelect.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string),
};

export default MultiSelect;
