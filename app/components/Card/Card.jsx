import { useState, forwardRef } from "react";
import TinderCard from "react-tinder-card";
import Skeleton from "@material-ui/lab/Skeleton";

import styles from "./Card.module.scss";

const Card = forwardRef(
  (
    { distance, height, id, index, name, onCardLeftScreen, onSwipe, pictures },
    ref
  ) => {
    const [selectedPicture, setSelectedPicture] = useState(0);

    const handleRightButton = () => {
      if (selectedPicture + 1 < pictures.length)
        setSelectedPicture((prevState) => prevState + 1);
    };

    const handleLeftButton = () => {
      if (selectedPicture - 1 >= 0)
        setSelectedPicture((prevState) => prevState - 1);
    };

    const trueHeight = height ? Math.trunc(height * 0.9) : 0;
    const trueWidth = height ? Math.trunc(height * 0.50625) : 0; // 56.25% of 90%

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
          onSwipe={(dir) => onSwipe(dir, id)}
          ref={ref}
          onCardLeftScreen={onCardLeftScreen}
        >
          <div
            className={styles.Card}
            style={{
              height: trueHeight,
              width: trueWidth,
            }}
          >
            {pictures ? (
              <img
                className={styles.Card__Image}
                alt={`${name} - ${selectedPicture}`}
                style={{
                  maxHeight: trueHeight,
                  maxWidth: trueWidth, // 60% of 90%
                  width: "auto",
                  height: "auto",
                }}
              />
            ) : (
              <Skeleton
                variant="rect"
                width={trueWidth}
                height={trueHeight}
                animation="wave"
              >
                <img
                  style={{
                    maxHeight: trueHeight,
                    maxWidth: trueWidth, // 60% of 90%
                    width: "auto",
                    height: "auto",
                  }}
                />
              </Skeleton>
            )}
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
              {pictures && selectedPicture + 1 < pictures.length && (
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
