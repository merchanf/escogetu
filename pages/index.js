import { useRef, useEffect, useState } from "react";
import { useModal, Modal } from "react-morphing-modal";
import "react-morphing-modal/dist/ReactMorphingModal.css";
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
  const modalRef = useRef(null);
  const [position, setPosition] = useState();
  const [list, loading] = useGetRestaurants(
    position?.latitude,
    position?.longitude
  );
  const [userUid, _] = useState(uid());
  const [sessionId, setSessionId] = useState();
  const { open, modalProps } = useModal();
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
    const unsubscribe = db
      .doc(`session/${sessionId}`)
      .onSnapshot((snapshot) => {
        if (snapshot.data()?.users) {
          const users = snapshot.data().users;
          const likes = users.map((user) => snapshot.data()[user]);
          const result = likes.reduce((a, b) => a.filter((c) => b.includes(c)));
          if (result.length) {
            open(modalRef, {
              id: "modalId",
              background: "#DDAEAE",
              onClose: () => handleOnClose(result[0]),
            });
        }
        }
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
    <>
      <Modal {...modalProps}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Pretium vulputate
        sapien nec sagittis aliquam malesuada bibendum arcu. Massa sapien
        faucibus et molestie ac feugiat sed lectus vestibulum. Habitant morbi
        tristique senectus et netus et malesuada. Tristique magna sit amet purus
        gravida quis blandit. Quam viverra orci sagittis eu volutpat odio
        facilisis mauris sit. Pharetra diam sit amet nisl suscipit adipiscing.
        Turpis egestas pretium aenean pharetra magna ac placerat vestibulum.
        Luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor
        purus. Lobortis scelerisque fermentum dui faucibus. Nec feugiat in
        fermentum posuere urna nec tincidunt praesent semper. Eget egestas purus
        viverra accumsan. Platea dictumst quisque sagittis purus. Nibh nisl
        condimentum id venenatis a. Viverra orci sagittis eu volutpat odio
        facilisis mauris. Eu tincidunt tortor aliquam nulla facilisi. Adipiscing
        bibendum est ultricies integer quis auctor elit sed vulputate.
        Condimentum lacinia quis vel eros donec ac odio tempor. Non consectetur
        a erat nam at lectus urna. Nulla facilisi nullam vehicula ipsum. Egestas
        diam in arcu cursus. Tortor at risus viverra adipiscing at in tellus
        integer. Orci dapibus ultrices in iaculis nunc sed augue lacus. Enim
        nunc faucibus a pellentesque sit amet porttitor eget dolor. Lectus
        vestibulum mattis ullamcorper velit. Ut morbi tincidunt augue interdum
        velit euismod in pellentesque massa. Nunc vel risus commodo viverra. Est
        lorem ipsum dolor sit amet consectetur. Quis vel eros donec ac. Libero
        id faucibus nisl tincidunt eget nullam non nisi. Etiam erat velit
        scelerisque in dictum non. Dictum sit amet justo donec. Lorem sed risus
        ultricies tristique nulla aliquet enim. Risus nec feugiat in fermentum
        posuere. Habitant morbi tristique senectus et netus et malesuada fames
        ac. Cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum.
        Sollicitudin aliquam ultrices sagittis orci a scelerisque. Consequat
        mauris nunc congue nisi. Enim ut tellus elementum sagittis vitae et leo
        duis. Massa ultricies mi quis hendrerit dolor. Sagittis orci a
        scelerisque purus semper eget duis at tellus. Neque volutpat ac
        tincidunt vitae semper quis lectus nulla. Neque sodales ut etiam sit. In
        eu mi bibendum neque egestas. Sed faucibus turpis in eu. Non tellus orci
        ac auctor augue mauris augue neque gravida. Semper quis lectus nulla at
        volutpat diam ut venenatis. Urna et pharetra pharetra massa. Convallis
        posuere morbi leo urna molestie at elementum. Varius vel pharetra vel
        turpis nunc eget lorem dolor sed. Molestie nunc non blandit massa enim
        nec dui. Ut pharetra sit amet aliquam id. Orci ac auctor augue mauris
        augue neque gravida. Elementum nisi quis eleifend quam adipiscing vitae
        proin. Pretium fusce id velit ut. Sem integer vitae justo eget magna
        fermentum iaculis. Odio euismod lacinia at quis risus sed. Placerat
        vestibulum lectus mauris ultrices eros in. Enim ut sem viverra aliquet
        eget sit. Velit scelerisque in dictum non consectetur a. Urna
        condimentum mattis pellentesque id nibh tortor id aliquet.
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
