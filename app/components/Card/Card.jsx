import TinderCard from "react-tinder-card";

import styles from './Card.module.scss';

const Card = ({list}) => {
  const onSwipe = (direction) => {
    console.log("You swiped: " + direction);
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
  };

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (
    <div className={styles.cardContainer}>
      {list.map((character) =>
        <TinderCard className={styles.swipe} key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
          <img className={styles.card} src={`https://via.placeholder.com/300x465?text=${character.name}`} />
        </TinderCard>
      )}
    </div>
  );
};

export default Card;
