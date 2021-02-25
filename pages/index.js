import { useRef, useEffect, useState } from "react";
import { useModal, Modal } from "react-morphing-modal";
import "react-morphing-modal/dist/ReactMorphingModal.css";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import {
  CardList,
  Layout,
  RestaurantDetails,
} from "../app/components/components";
import {
  LikeIcon,
  CrossIcon,
  ShareIcon,
  withIconButton,
} from "../app/components/Icons/Icons";
import useGetRestaurants from "../app/Hooks/useGetRestaurants";
import useGetRestaurantDetails from "../app/Hooks/useGetRestaurantDetails";
import firebase from "../app/firebase/config";
import { uid } from "uid";

const LikeIconButton = withIconButton(LikeIcon);
const ShareIconButton = withIconButton(ShareIcon);
const CrossIconButton = withIconButton(CrossIcon);

export default function Home() {
  const card = useRef(0);
  const modalRef = useRef(null);
  const [position, setPosition] = useState();
  const [matchedPlace, setMatchedPlace] = useState();
  const [list, loading] = useGetRestaurants(
    position?.latitude,
    position?.longitude
  );
  const [userUid, _] = useState(uid());
  const [sessionId, setSessionId] = useState();
  const { open, modalProps } = useModal();
  const { db } = firebase;
  const [loadingDetails, details] = useGetRestaurantDetails(matchedPlace);

  useEffect(() => {
    (async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const session = urlParams.get("session");
      if (session) {
        setSessionId(session);
        const docRef = db.doc(`session/${session}`);
        try {
          let document = await docRef.get();
          if (document) {
            const fsPosition = document.data().location;
            const users = document.data().users;
            console.log(document.data());
            setPosition({
              latitude: fsPosition.latitude,
              longitude: fsPosition.longitude,
            });
            docRef.set(
              {
                [userUid]: [],
                users: [...users, userUid],
              },
              { merge: true }
            );
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        navigator.geolocation.getCurrentPosition((position) => {
          setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        });
      }
    })();
  }, []);

  useEffect(() => {
    if (position && !sessionId) {
      const docRef = db.collection("session").doc();
      setSessionId(docRef.id);
      docRef.set({
        [userUid]: [],
        users: [userUid],
        location: position,
      });
    }
  }, [position, sessionId]);

  const handleOnClose = async (nameToDelete) => {
    const query = db.doc(`session/${sessionId}`);
    try {
      let document = await query.get();
      if (document) {
        const liked = document.data()[userUid];
        await query.set(
          { [userUid]: liked.filter((item) => item !== nameToDelete) },
          { merge: true }
        );
      }
    } catch (e) {
      console.log(e);
    }
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

  const swiped = async (direction, id) => {
    if (direction === "right") {
      const query = db.doc(`session/${sessionId}`);
      try {
        let document = await query.get();
        if (document) {
          const liked = document.data()[userUid];
          await query.set({ [userUid]: [...liked, id] }, { merge: true });
        }
      } catch (e) {
        console.log(e);
      }
    }
    card.current += 1;
  };

  const swipe = (dir) => {
    list[card.current].ref.current.swipe(dir); // Swipe the card!
  };

  return (
    <>
      <Modal {...modalProps}>
        <Layout background="Dark">
          {details && <RestaurantDetails {...details} />}
        </Layout>
      </Modal>
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
              <h3>Loading ... </h3>
            ) : (
              <CardList list={list} onSwipe={swiped} />
            )}
            <div className={styles.Home__Buttons}>
              <CrossIconButton
                onClick={() => swipe("left")}
                size="large"
                color="red"
              />
              <ShareIconButton color="blue" />
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
