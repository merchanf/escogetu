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
      <TinderCard
        className={styles.TinderCard}
        onSwipe={(dir) => onSwipe(dir, name)}
        ref={ref}
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
          
        </div>
      </TinderCard>
    );
  }
);

export default Card;
