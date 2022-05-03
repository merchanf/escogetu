import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setRestaurantDetailsPictures } from '@actions/session.action';
import { getPicturesURL } from '@services/firestore.service';

const useGetFirestorePictures = (placeId) => {
  const [loading, setLoading] = useState(false);
  const [pictures, setPictures] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const getPictures = async () => {
      setLoading(true);
      const pictures = await getPicturesURL(placeId);
      setPictures(pictures);
      dispatch(setRestaurantDetailsPictures({ placeId, pictures }));
      setLoading(false);
    };

    if (placeId && pictures == null) {
      getPictures();
    }
  }, [dispatch, placeId, pictures]);

  return { loading, pictures };
};

export default useGetFirestorePictures;
