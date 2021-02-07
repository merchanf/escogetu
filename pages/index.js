import { createRef, useState, useMemo, useRef } from "react";
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
import { db } from "../app/components/CardList/CardList.stories";

const LikeIconButton = withIconButton(LikeIcon);
const ShareIconButton = withIconButton(ShareIcon);
const CrossIconButton = withIconButton(CrossIcon);
const alreadyRemoved = [];

export default function Home() {
  const card = useRef(0);
  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => createRef()),
    []
  );

  const swiped = (direction, name) => {
    console.log(direction, name)
    card.current += 1;
  }

  const swipe = (dir) => {
    childRefs[card.current].current.swipe(dir); // Swipe the card!
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
          <CardList list={db} refs={childRefs} onSwipe={swiped} />
          <div className={styles.Home__Buttons}>
            <CrossIconButton
              onClick={() => swipe('left')}
              size="large"
              color="red"
            />
            <ShareIconButton color="blue" />
            <LikeIconButton
              onClick={() => swipe('right')}
              size="large"
              color="green"
            />
          </div>
        </div>
      </Layout>
    </div>
  );
}
