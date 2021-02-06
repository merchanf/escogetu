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

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <Layout>
        <div className={styles.Home}>
          <CardList list={db} />
          <div className={styles.Home__Buttons}>
            <LikeIconButton size="large" color="green" />
            <ShareIconButton />
            <CrossIconButton size="large" color="red" />
          </div>
        </div>
      </Layout>
    </div>
  );
}
