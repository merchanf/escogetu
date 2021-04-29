/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { useMount } from '@hooks/use-mount.hook';
import { hydrate } from '@actions/hydrate.action';
import { LoadingIcon } from '@app/components';
import { markAsShown } from '@services/firestore.service';

const InitializationWrapperBase = ({
  children,
  userUid,
  isMinimumAppDataLoaded,
  sessionId,
  database,
  likes,
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
              console.log('id', id);
              markAsShown(sessionId, userUid, id, database);
            }
          });
        }
      });
    }
    return () => unsubscribe && unsubscribe();
  }, [database, sessionId, userUid]);

  /* useEffect(() => {
    console.log(likes);
  }, [likes]); */

  if (!isMinimumAppDataLoaded) {
    return <LoadingIcon />;
  }

  return children;
};

const mapStateToProps = ({
  user: {
    userUid,
    sessionId,
    likes,
    geoLocation: { loading: loadingLocation },
  },
  hydrate: {
    firebase: { database },
  },
}) => ({
  userUid,
  sessionId,
  likes,
  isMinimumAppDataLoaded: !loadingLocation,
  database,
});

InitializationWrapperBase.defaultProps = {
  userUid: null,
};

InitializationWrapperBase.propTypes = {
  userUid: PropTypes.string,
  isMinimumAppDataLoaded: PropTypes.bool.isRequired,
  database: PropTypes.object,
  likes: PropTypes.object,
};

export const InitializationWrapper = connect(mapStateToProps)(InitializationWrapperBase);
