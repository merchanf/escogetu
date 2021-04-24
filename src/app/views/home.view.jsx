import { Modal, useModal } from 'react-morphing-modal';
import React, { useEffect, useRef, useState } from 'react';
import { uid } from 'uid';
import { CardList, Layout, LoadingIcon, RestaurantDetails, ShareDialog } from '@app/components';
import useGoogleMaps from '@hooks/useGoogleMaps';
import { useDeck } from '@hooks/useDeck';
import useGetRestaurantDetails from '@hooks/useGetRestaurantDetails';
import { firebase, session } from '@services/firebase/firebase';
import { CrossIconButton, LikeIconButton, ShareIconButton } from '@components/Icons/Icons';

import './home.view.scss';

const domain = process.env.REACT_APP_DOMAIN;

export const Home = () => {
  const modalRef = useRef(null);
  const [position, setPosition] = useState();
  const [matchedPlace, setMatchedPlace] = useState();
  const googleMaps = useGoogleMaps();
  const [loading, list, pop] = useDeck(position?.lat, position?.lng, googleMaps);
  const [loadingDetails, details] = useGetRestaurantDetails(matchedPlace, googleMaps);
  const [userUid] = useState(uid());
  const [sessionId, setSessionId] = useState();
  const { open, modalProps } = useModal();
  const { db, analytics } = firebase;
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const sessionParam = urlParams.get('session');
      if (sessionParam) {
        setSessionId(sessionParam);
        const { lat, lng } = await session.load(userUid, sessionParam);
        setPosition({
          lat,
          lng,
        });
      } else {
        navigator.geolocation.getCurrentPosition((position) => {
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        });
      }
    })();
    analytics();
  }, [analytics, userUid]);

  useEffect(() => {
    (async () => {
      if (position && !sessionId) {
        const docRefId = await session.create(userUid, position);
        setSessionId(docRefId);
      }
    })();
  }, [position, sessionId]);

  const handleOnClose = async (itemToDelete) => {
    await session.deleteLikedItem(sessionId, userUid, itemToDelete);
  };

  useEffect(() => {
    if (matchedPlace) {
      open(modalRef, {
        id: 'modalId',
        background: '#f9ebea',
        onClose: () => handleOnClose(matchedPlace),
      });
    }
  }, [handleOnClose, matchedPlace, open]);

  useEffect(() => {
    const unsubscribe = db.doc(`session/${sessionId}`).onSnapshot((snapshot) => {
      if (snapshot.data()?.users) {
        const { users } = snapshot.data();
        const likes = users.map((user) => snapshot.data()[user]);
        const result = likes.reduce((a, b) => a.filter((c) => b.includes(c)));
        if (result.length) {
          setMatchedPlace(result[0]);
        }
      }
    });
    return () => unsubscribe();
  }, [db, sessionId]);

  const swiped = async (direction, likedItem) => {
    if (direction === 'right') {
      await session.like(sessionId, userUid, likedItem);
    }
  };

  const swipe = (dir) => {
    list[0].ref.current.swipe(dir); // Swipe the card!
  };

  return (
    <>
      <div id="map" />
      <Modal {...modalProps}>
        <Layout background="Dark">{details && <RestaurantDetails {...details} />}</Layout>
      </Modal>
      <ShareDialog
        open={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        url={`${domain}?session=${sessionId}`}
      />
      <div className="container" ref={modalRef}>
        <Layout>
          <div className="Home">
            <div className="Home__Body">
              {loading ? (
                <LoadingIcon />
              ) : (
                <CardList list={list} onSwipe={swiped} onCardLeftScreen={pop} />
              )}
            </div>
            <div className="Home__Buttons">
              <CrossIconButton onClick={() => swipe('left')} size="large" color="red" />
              <ShareIconButton onClick={() => setIsShareModalOpen(true)} color="blue" />
              <LikeIconButton onClick={() => swipe('right')} size="large" color="green" />
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
};
