import { useRef, useEffect, useState } from "react";
import { useModal, Modal } from "react-morphing-modal";
import "react-morphing-modal/dist/ReactMorphingModal.css";
import Head from "next/head";

import styles from "../styles/Home.module.scss";
import {
  CardList,
  Layout,
  RestaurantDetails,
  ShareDialog,
  LoadingIcon,
} from "../app/components/components";
import {
  BittedHeartIcon,
  CrossCutterlyIcon,
  ShareIcon,
  withIconButton,
} from "../app/components/Icons/Icons";
import useGetRestaurants from "../app/Hooks/useGetRestaurants";
import useGetRestaurantDetails from "../app/Hooks/useGetRestaurantDetails";
import firebase, { session } from "../app/firebase/firebase";
import { uid } from "uid";

const LikeIconButton = withIconButton(BittedHeartIcon);
const ShareIconButton = withIconButton(ShareIcon);
const CrossIconButton = withIconButton(CrossCutterlyIcon);
const domain = process.env.DOMAIN;
const gMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

export default function Home() {
  const card = useRef(0);
  const modalRef = useRef(null);
  const [position, setPosition] = useState();
  const [matchedPlace, setMatchedPlace] = useState();
  const [list, loading, loadNextPage, pop] = useGetRestaurants(
    position?.lat,
    position?.lng
  );
  const [userUid, _] = useState(uid());
  const [sessionId, setSessionId] = useState();
  const { open, modalProps } = useModal();
  const { db, analytics } = firebase;
  const [loadingDetails, details] = useGetRestaurantDetails(matchedPlace);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const sessionParam = urlParams.get("session");
      if (sessionParam) {
        setSessionId(sessionParam);
        const { lat, lng } = await session.load(userUid, sessionParam);
        setPosition({
          lat: lat,
          lng: lng,
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
  }, []);

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
        id: "modalId",
        background: "#f9ebea",
        onClose: () => handleOnClose(matchedPlace),
      });
    }
  }, [matchedPlace]);

  useEffect(() => {
    const unsubscribe = db
      .doc(`session/${sessionId}`)
      .onSnapshot((snapshot) => {
        if (snapshot.data()?.users) {
          const users = snapshot.data().users;
          const likes = users.map((user) => snapshot.data()[user]);
          const result = likes.reduce((a, b) => a.filter((c) => b.includes(c)));
          if (result.length) {
            setMatchedPlace(result[0]);
          }
        }
      });
    return () => unsubscribe();
  }, [sessionId]);

  const swiped = async (direction, likedItem) => {
    if (direction === "right") {
      await session.like(sessionId, userUid, likedItem);
    }
    pop();
    if (list.length <= 5) loadNextPage();
  };

  const onCardLeftScreen = () => {
    if (list.length <= 5) loadNextPage();
  };

  const swipe = (dir) => {
    list[0].ref.current.swipe(dir); // Swipe the card!
  };

  return (
    <>
      <div id="map"></div>
      <Modal {...modalProps}>
        <Layout background="Dark">
          {details && <RestaurantDetails {...details} />}
        </Layout>
      </Modal>
      <ShareDialog
        open={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        url={`${domain}?session=${sessionId}`}
      />
      <div className={styles.container} ref={modalRef}>
        <Head>
          <title>Escoge tu!</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
            rel="stylesheet"
          ></link>
        </Head>

        <Layout>
          <div className={styles.Home}>
            {loading ? (
              <LoadingIcon />
            ) : (
              <CardList list={list} onSwipe={swiped} />
            )}
            <div className={styles.Home__Buttons}>
              <CrossIconButton
                onClick={() => swipe("left")}
                size="large"
                color="red"
              />
              <ShareIconButton
                onClick={() => setIsShareModalOpen(true)}
                color="blue"
              />
              <LikeIconButton
                onClick={() => swipe("right")}
                size="large"
                color="green"
              />
            </div>
          </div>
        </Layout>
      </div>
    </>
  );
}
