import Card from '../Card/Card';

import styles from './CardList.module.scss';

const CardList = ({list}) => {

  const onSwipe = (direction, nameToDelete) => {
    console.log(nameToDelete, direction);
  }

  return (
    <div className={styles.cardContainer}>
      {list.map(({name, pictures, distance}, index) =>
        <Card name={name} pictures={pictures} distance={distance} key={name} onSwipe={onSwipe} index={index}/>
      )}
    </div>
  );
};

export default CardList;
