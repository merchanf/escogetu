import { createRef, useState, useMemo, useRef, useEffect } from "react";
import useAxios from "axios-hooks";
import axios from "axios";
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

const gMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
const defaultRadius = 2500;
const LikeIconButton = withIconButton(LikeIcon);
const ShareIconButton = withIconButton(ShareIcon);
const CrossIconButton = withIconButton(CrossIcon);

const nearbyRestaurantsEndpoint = (lat, long, radius, key) =>
  `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=${radius}&type=restaurant&key=${key}`;

const placePhotoSrc = (photoreference, maxheight = 16000) =>
  `https://maps.googleapis.com/maps/api/place/photo?key=${gMapsApiKey}&photoreference=${photoreference}&maxheight=${1600}`;

const getPlaceDetailsEndpoint = (placeId) =>
  `https://maps.googleapis.com/maps/api/place/details/json?key=${gMapsApiKey}&place_id=${placeId}`;

export default function Home() {
  const card = useRef(0);
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState();
  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => createRef()),
    []
  );

  useEffect(() => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        const {
          data: { results },
        } = await axios.get(
          nearbyRestaurantsEndpoint(lat, long, defaultRadius, gMapsApiKey)
        );
        //console.log(results);
        const db = results
          .map(({ place_id, name, photos, geometry: { lat, lng } }) => {
            if (!photos) return null;
            const response = axios
              .get(getPlaceDetailsEndpoint(place_id))
              .then(({ data: { result: { photos } } }) => console.log(photos));
            return {
              name: name,
              distance: "3 Km",
              pictures: photos.map(({ photo_reference, height }) =>
                placePhotoSrc(photo_reference, height)
              ),
              ref: createRef(),
            };
          })
          .filter((result) => result != null);
        console.log(db);
        //setList(db);
        //setLoading(false);
      },
      () => console.log("Denied")
    );
  }, []);

  const swiped = (direction, name) => {
    console.log(direction, name);
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
            <CardList list={list} refs={childRefs} onSwipe={swiped} />
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
