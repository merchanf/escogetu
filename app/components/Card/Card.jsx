import { useState, forwardRef } from "react";
import TinderCard from "react-tinder-card";

import styles from "./Card.module.scss";

const Card = forwardRef(
  ({ name, distance, pictures, onSwipe, index, width, height }, ref) => {
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
          position: "absolute",
          zIndex: 10 - index,
          height: height * 0.9,
        }}
      >
        <TinderCard
          className={styles.Wrapper}
          onSwipe={(dir) => onSwipe(dir, name)}
          ref={ref}
        >
          <img
            className={styles.Wrapper__Image}
            src={pictures[selectedPicture]}
            alt={`${name} - ${selectedPicture}`}
            style={{
              height: height * 0.9,
              width: "auto",
            }}
          />
          <p className={styles.Wrapper__Name}>
            <b>{name}</b>, {distance}
          </p>
          <div className={styles.Wrapper__Buttons}>
            {selectedPicture - 1 >= 0 ? (
              <button
                className={styles.Wrapper__Buttons__Button}
                onClick={handleLeftButton}
              >
                {"<"}
              </button>
            ) : (
              <div></div>
            )}
            {selectedPicture + 1 < pictures.length && (
              <button
                className={styles.Wrapper__Buttons__Button}
                onClick={handleRightButton}
              >
                {">"}
              </button>
            )}
          </div>
        </TinderCard>
      </div>
    );
  }
);

export default Card;
