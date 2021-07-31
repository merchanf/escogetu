import React, { useMemo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useModal, Modal } from 'react-morphing-modal';
import {
  CardList,
  LoadingIcon,
  ShareButton,
  FeedbackButton,
  Layout,
  RestaurantDetails,
} from '@app/components';
import { FEEDBACK_ID, DOMAIN } from '@constants/env.constants';
import { CrossIconButton, LikeIconButton } from '@components/Icons/Icons';
import 'react-morphing-modal/dist/ReactMorphingModal.css';

import './home.view.scss';
import { useRestaurants } from '@hooks/useRestaurants';

const HomeViewBase = ({ sessionId, match, likes }) => {
  const { restaurants, swipe, onSwipe, onCardLeftScreen } = useRestaurants();
  const modalRef = useRef(null);
  const { open, modalProps } = useModal();

  const restaurantsWithPhoto = useMemo(
    () => restaurants.filter((restaurant) => restaurant.pictures?.length),
    [restaurants],
  );

  useEffect(() => {
    if (match) {
      open(modalRef, {
        id: 'modalId',
        background: '#f9ebea',
        // onClose: () => handleOnClose(match),
      });
    }
    // Open is out of control, so we must skip that dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match]);

  if (!restaurantsWithPhoto.length) {
    return <LoadingIcon />;
  }

  return (
    <div className="Home" ref={modalRef}>
      {match && (
        <Modal {...modalProps}>
          <Layout background="Dark">
            <RestaurantDetails {...likes[match]} />
          </Layout>
        </Modal>
      )}
      <div className="Home__Body">
        <CardList list={restaurants} onSwipe={onSwipe} onCardLeftScreen={onCardLeftScreen} />
      </div>
      <div className="Home__Buttons">
        <CrossIconButton onClick={() => swipe('left')} size="medium" color="red" />
        <ShareButton sessionId={sessionId} domain={DOMAIN} />
        <LikeIconButton onClick={() => swipe('right')} size="medium" color="green" />
      </div>
      <FeedbackButton projectId={FEEDBACK_ID} />
    </div>
  );
};

const mapStateToProps = ({ user: { userUid, sessionId, match, likes } }) => ({
  userUid,
  sessionId,
  match,
  likes,
});

HomeViewBase.defaultProps = {
  match: null,
};

HomeViewBase.propTypes = {
  sessionId: PropTypes.string.isRequired,
  match: PropTypes.string,
  // Add base object.
  // eslint-disable-next-line react/forbid-prop-types
  likes: PropTypes.object.isRequired,
};

export const HomeView = connect(mapStateToProps)(HomeViewBase);
