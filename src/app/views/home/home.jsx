import React, { useMemo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useModal, Modal } from 'react-morphing-modal';
import {
  CardList,
  ShareButton,
  FeedbackButton,
  Layout,
  RestaurantDetails,
  LoadingIcon,
} from '@app/components';
import useWindowDimensions from '@hooks/useWindowDimensions';
import { FEEDBACK_ID, DOMAIN } from '@constants/env.constants';
import { CrossIconButton, LikeIconButton } from '@components/Icons/Icons';

import 'react-morphing-modal/dist/ReactMorphingModal.css';
import { Instructions } from '@app/views';
import './home.scss';

import { useRestaurants } from '@hooks/useRestaurants';

const HomeViewBase = (props) => {
  const { sessionId, match, likes, flow } = props;
  const { width } = useWindowDimensions();
  const { restaurants, loading, swipe, onSwipe, onCardLeftScreen } = useRestaurants(flow);
  const [showInstructions, setShowInstructions] = useState(
    !localStorage.getItem('closeAndNeverShowAgain'),
  );
  const [size, setSize] = useState('medium');
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

  useEffect(() => {
    if (width > 768) setSize('large');
    else setSize('medium');
  }, [width]);

  const onClose = () => {
    setShowInstructions(false);
  };

  const onCloseAndNeverShowAgain = () => {
    setShowInstructions(false);
    localStorage.setItem('closeAndNeverShowAgain', true);
  };

  const render = () => {
    if (loading) return <LoadingIcon />;
    if (restaurants.length === 0) return <h1>No hay más restaurantes en tu área :(</h1>;
    if (showInstructions)
      return <Instructions onClose={onClose} onCloseAndNeverShowAgain={onCloseAndNeverShowAgain} />;

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
          <CrossIconButton onClick={() => swipe('left')} size={size} color="red" />
          <ShareButton sessionId={sessionId} domain={DOMAIN} />
          <LikeIconButton onClick={() => swipe('right')} size={size} color="green" />
        </div>
        <FeedbackButton projectId={FEEDBACK_ID} />
      </div>
    );
  };

  return render();
};

const mapStateToProps = ({ user: { userUid, sessionId, match, likes, flow } }) => ({
  userUid,
  sessionId,
  match,
  likes,
  flow,
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
  flow: PropTypes.string.isRequired,
};

const HomeView = connect(mapStateToProps)(HomeViewBase);
export default HomeView;
