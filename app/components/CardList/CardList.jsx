import { useRef, useEffect, useState } from "react";
import Card from "../Card/Card";
import styles from "./CardList.module.scss";

const CardList = ({ list, refs }) => {
  const ref = useRef(null);
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const onSwipe = (direction, nameToDelete) => {
    console.log(nameToDelete, direction);
  };

  useEffect(() => {
    setWidth(ref.current.clientWidth);
    setHeight(ref.current.clientHeight);
  }, [ref?.current?.clientWidth, ref?.current?.clientHeight]);

  return (
    <div className={styles.Container} ref={ref}>
      {list.map(({ name, pictures, distance }, index) => (
        <Card
          name={name}
          pictures={pictures}
          distance={distance}
          key={name}
          onSwipe={onSwipe}
          index={list.length - index}
          width={width}
          height={height}
          ref={refs && refs[index]}
        />
      ))}
    </div>
  );
};

export default CardList;
