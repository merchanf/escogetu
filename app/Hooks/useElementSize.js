import { useState, useEffect } from "react";

const useElementSize = (ref) => {
  const [size, setSize] = useState([0, 0]);

  useEffect(() => {
    console.log(ref?.current);
    console.log(ref?.current?.innerWidth);
    setSize([ref?.current?.innerWidth, ref?.current?.innerHeight]);
  }, [ref?.current?.innerWidth, ref?.current?.innerHeight]);

  return size;
};

export default useElementSize;