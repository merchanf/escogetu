import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router-dom';

import { fetchRestaurant as fetchRestaurantFromFirebase } from '@services/firestore.service';
import { logScreenView } from '@services/googleAnalytics.service';
import { RestaurantDetails, Layout, LoadingIcon } from '@components/index';
import { withIconButton } from '@components/Icons/Icons';
import { routes } from '@constants/constants';

import styles from './Match.module.scss';

const CloseIconButton = withIconButton(CloseIcon);

const Match = (props) => {
  const { onClose, restaurant } = props;
  const [restaurantDetails, setRestaurantDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [external, setExternal] = useState(false);
  const history = useHistory();

  const onError = useCallback(() => {
    const { search } = window.location;
    const path = search ? `${routes.LAUNCHER}${search}` : routes.LAUNCHER;
    history.push(path);
  }, [history]);

  useEffect(() => {
    logScreenView('match', onError);
  }, [onError]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const restaurantId = urlParams.get('restaurant');
    const fetchRestaurant = async () => {
      await fetchRestaurantFromFirebase(
        restaurantId,
        setRestaurantDetails,
        setLoading,
        onError,
        true,
      );
    };

    if (restaurant) {
      setRestaurantDetails(restaurant);
    } else if (!restaurantDetails && restaurantId) {
      fetchRestaurant();
      setExternal(true);
    }
  }, [restaurantDetails, history, onError, restaurant]);

  return (
    <Layout className={styles.Match}>
      {onClose && (
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
        <RestaurantDetails {...restaurantDetails} showPictures={external} showMap={!external} />
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
