import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { useMount } from '@hooks/use-mount.hook';
import { hydrate } from '@actions/hydrate.action';
import { LoadingIcon } from '@app/components';

const InitializationWrapperBase = ({
  children,
  userUid,
  isMinimumAppDataLoaded,
  sessionId,
  database,
}) => {
  const dispatch = useDispatch();

  useMount(() => {
    dispatch(hydrate(userUid));
  });

  useEffect(() => {
    let unsubscribe;
    if (database) {
      unsubscribe = database.doc(`session/${sessionId}`).onSnapshot((snapshot) => {
        if (snapshot.data()) {
          const { likedRestaurants, users } = snapshot.data();
          const usersAmount = users.length;
          likedRestaurants.forEach(({ likes, poppedUp, id }) => {
            const likesAmount = likes.length;
            if (likesAmount === usersAmount && !poppedUp) {
              console.log('its a match');
            }
          });
        }
      });
    }
    return () => unsubscribe && unsubscribe();
  }, [database, sessionId]);

  if (!isMinimumAppDataLoaded) {
    return <LoadingIcon />;
  }

  return children;
};

const mapStateToProps = ({
  user: {
    userUid,
    sessionId,
    geoLocation: { loading: loadingLocation },
  },
  hydrate: {
    firebase: { database },
  },
}) => ({
  userUid,
  sessionId,
  isMinimumAppDataLoaded: !loadingLocation,
  database,
});

InitializationWrapperBase.defaultProps = {
  userUid: null,
};

InitializationWrapperBase.propTypes = {
  userUid: PropTypes.string,
  isMinimumAppDataLoaded: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  database: PropTypes.object,
};

export const InitializationWrapper = connect(mapStateToProps)(InitializationWrapperBase);
