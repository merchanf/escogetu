import { useRef, useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Layout from "../app/components/Layout/Layout";
import CardList from "../app/components/CardList/CardList";
import {
  LikeIcon,
  CrossIcon,
  ShareIcon,
  withIconButton,
} from "../app/components/Icons/Icons";
import useGetRestaurants from "../app/Hooks/useGetRestaurants";
import firebase from "../app/firebase/config";
import { uid } from "uid";

const LikeIconButton = withIconButton(LikeIcon);
const ShareIconButton = withIconButton(ShareIcon);
const CrossIconButton = withIconButton(CrossIcon);

export default function Home() {
  const card = useRef(0);
  const [position, setPosition] = useState();
  const [list, loading] = useGetRestaurants(
    position?.latitude,
    position?.longitude
  );
  const [userUid, _] = useState(uid());
  const [sessionId, setSessionId] = useState();
  const [data, setData] = useState();
  const { db } = firebase;

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
            setPosition({
              latitude: fsPosition.latitude,
              longitude: fsPosition.longitude,
            });
            docRef.set(
              {
                [userUid]: [],
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
        location: position,
      });
    }
  }, [position, sessionId]);

  useEffect(() => {
    const unsubscribe = db
      .doc(`session/${sessionId}`)
      .onSnapshot((snapshot) => {
        console.log("Current data: ", snapshot.data());
      });
    return () => {
      unsubscribe();
    };
  }, [sessionId]);

  const swiped = async (direction, name) => {
    if (direction === "right") {
      const query = db.doc(`session/${sessionId}`);
      try {
        let document = await query.get();
        if (document) {
          const liked = document.data()[userUid];
          await query.set({ [userUid]: [...liked, name] }, { merge: true });
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
    <div className={styles.container}>
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
  );
}
