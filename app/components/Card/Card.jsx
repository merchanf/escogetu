import { useState, forwardRef } from "react";
import TinderCard from "react-tinder-card";

import styles from "./Card.module.scss";

const Card = forwardRef(
  (
    {
      name,
      distance,
      pictures,
      onSwipe,
      index,
      height,
      onCardLeftScreen,
    },
    ref
  ) => {
    const [selectedPicture, setSelectedPicture] = useState(0);

    const handleRightButton = () => {
      if (selectedPicture + 1 < pictures.length)
        setSelectedPicture((prevState) => prevState + 1);
      console.log("clicked right");
    };

    const handleLeftButton = () => {
      if (selectedPicture - 1 >= 0)
        setSelectedPicture((prevState) => prevState - 1);
      console.log("clicked left");
    };

    return (
      <div
        style={{
          display: "flex",
          position: "absolute",
          zIndex: index,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TinderCard
          className={styles.TinderCard}
          onSwipe={(dir) => onSwipe(dir, name)}
          ref={ref}
          onCardLeftScreen={onCardLeftScreen}
        >
          <div
            className={styles.Card}
            style={{
              height: height && Math.trunc(height * 0.9),
              width: height && Math.trunc(height * 0.54), // 60% of 90%
            }}
          >
            <img
              className={styles.Card__Image}
              src={pictures[selectedPicture]}
              alt={`${name} - ${selectedPicture}`}
              style={{
                maxHeight: height && Math.trunc(height * 0.9),
                maxWidth: height && Math.trunc(height * 0.54), // 60% of 90%
                width: "auto",
                height: "auto",
              }}
            />
            <div className={styles.Card__Buttons}>
              {selectedPicture - 1 >= 0 ? (
                <button
                  className={styles.Card__Buttons__Button}
                  onClick={handleLeftButton}
                >
                  {"<"}
                </button>
              ) : (
                <div></div>
              )}
              {selectedPicture + 1 < pictures.length && (
                <button
                  className={styles.Card__Buttons__Button}
                  onClick={handleRightButton}
                >
                  {">"}
                </button>
              )}
            </div>
            <p className={styles.Card__Name}>
              <b>{name}</b>, {distance}
            </p>
          </div>
        </TinderCard>
      </div>
    );
  }
);

export default Card;
