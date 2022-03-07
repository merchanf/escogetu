/* eslint-disable react/forbid-prop-types */
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { doc, onSnapshot, getFirestore } from 'firebase/firestore';

import { setMatch } from '@actions/user.actions';
import { useMount } from '@hooks/use-mount.hook';
import { hydrate } from '@actions/hydrate.action';
import { markAsShown } from '@services/firestore.service';

const InitializationWrapperBase = ({ children, userUid, sessionId, isFirebaseLoading }) => {
  const dispatch = useDispatch();

  useMount(() => {
    dispatch(hydrate());
  });

  useEffect(() => {
    let unsubscribe;
    if (!isFirebaseLoading && sessionId) {
      const db = getFirestore();
      const docRef = doc(db, 'session', sessionId);
      unsubscribe = onSnapshot(docRef, (snapshot) => {
        if (snapshot.data()) {
          const { likedRestaurants, users } = snapshot.data();
          const usersAmount = users.length;
          likedRestaurants.forEach(({ likes: likes_, poppedUp, id }) => {
            const likesAmount = likes_?.length || 0;
            if (likesAmount === usersAmount && !poppedUp) {
              dispatch(setMatch(id));
              markAsShown(sessionId, userUid, id);
            }
          });
        }
      });
    }

    return () => unsubscribe && unsubscribe();
  }, [dispatch, isFirebaseLoading, sessionId, userUid]);

  return children;
};

const mapStateToProps = ({
  user: { userUid, sessionId, likes },
  hydrate: {
    firebase: { loading: isFirebaseLoading },
  },
}) => ({
  userUid,
  sessionId,
  likes,
  isFirebaseLoading,
});

InitializationWrapperBase.defaultProps = {
  userUid: null,
};

InitializationWrapperBase.propTypes = {
  userUid: PropTypes.string,
  isFirebaseLoading: PropTypes.bool,
  likes: PropTypes.object,
};

export const InitializationWrapper = connect(mapStateToProps)(InitializationWrapperBase);
