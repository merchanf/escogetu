/* eslint-disable react/forbid-prop-types */
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { setMatch } from '@actions/user.actions';
import { useMount } from '@hooks/use-mount.hook';
import { hydrate } from '@actions/hydrate.action';
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
          likedRestaurants.forEach(({ likes_, poppedUp, id }) => {
            const likesAmount = likes_?.length || 0;
            if (likesAmount === usersAmount && !poppedUp) {
              dispatch(setMatch(id));
              markAsShown(sessionId, userUid, id, database);
            }
          });
        }
      });
    }
    return () => unsubscribe && unsubscribe();
  }, [database, dispatch, sessionId, userUid]);

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
  database,
});

InitializationWrapperBase.defaultProps = {
  userUid: null,
};

InitializationWrapperBase.propTypes = {
  userUid: PropTypes.string,
  database: PropTypes.object,
  likes: PropTypes.object,
};

export const InitializationWrapper = connect(mapStateToProps)(InitializationWrapperBase);
