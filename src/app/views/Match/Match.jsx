import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router-dom';

import useGetRestaurantDetails from '@hooks/useGetRestaurantDetails';
import { logScreenView } from '@services/googleAnalytics.service';
import { RestaurantDetails, Layout, LoadingIcon } from '@components/index';
import { withIconButton } from '@components/Icons/Icons';
import { routes } from '@constants/constants';

import styles from './Match.module.scss';

const CloseIconButton = withIconButton(CloseIcon);

const Match = (props) => {
  const { onClose, restaurant } = props;

  let placeId;
  if (restaurant?.placeId) {
    placeId = restaurant.placeId;
  } else {
    const urlParams = new URLSearchParams(window.location.search);
    placeId = urlParams.get('restaurant');
  }

  const { loading, restaurantDetails } = useGetRestaurantDetails(placeId);
  const history = useHistory();

  const onError = useCallback(() => {
    const { search } = window.location;
    const path = search ? `${routes.LAUNCHER}${search}` : routes.LAUNCHER;
    history.push(path);
  }, [history]);

  useEffect(() => {
    logScreenView('match', onError);
  }, [onError]);

  return (
    <Layout className={styles.Match}>
      {onClose && !loading && (
        <CloseIconButton
          className={styles.Match__CloseButton}
          onClick={onClose}
          iconStyle={styles.Match__CloseButtonIcon}
          size="small"
        />
      )}
      {loading || !restaurantDetails ? (
        <LoadingIcon />
      ) : (
        <RestaurantDetails {...restaurantDetails} />
      )}
    </Layout>
  );
};

Match.propTypes = {
  onClose: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  restaurant: PropTypes.object,
  showMap: PropTypes.bool,
};

Match.defaultProps = {
  onClose: null,
  restaurant: null,
  showMap: true,
};

export default Match;
