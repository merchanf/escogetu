import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';

import { RestaurantDetails, Layout } from '@components/index';
import { withIconButton } from '@components/Icons/Icons';

import styles from './Match.module.scss';

const CloseIconButton = withIconButton(CloseIcon);

const Match = (props) => {
  const { onClose, restaurant } = props;

  return (
    <Layout className={styles.Match}>
      <CloseIconButton
        className={styles.Match__CloseButton}
        onClick={onClose}
        iconStyle={styles.Match__CloseButtonIcon}
        size="small"
      />
      <RestaurantDetails {...restaurant} />
    </Layout>
  );
};

Match.propTypes = {
  onClose: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  restaurant: PropTypes.object,
};

Match.defaultProps = {
  onClose: () => {},
  restaurant: {},
};

export default Match;
