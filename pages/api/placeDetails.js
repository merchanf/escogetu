// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import gup from "./gup";

const getPlaceDetailsEndpoint = (key, placeId) =>
  `https://maps.googleapis.com/maps/api/place/details/json?key=${key}&place_id=${placeId}`;

export default async (req, res) => {
  const placeId = gup("place_id", req.url);
  const key = gup("key", req.url);
  const request = getPlaceDetailsEndpoint(key, placeId);

  const {
    data: {
      result: { photos },
    },
  } = await axios.get(request);

  res.status(200).json({
    result: { photos },
  });
};
