// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import gup from "./gup";

const placePhotoSrc = (key, photoreference) =>
  `https://maps.googleapis.com/maps/api/place/photo?key=${key}&photoreference=${photoreference}&maxheight=${1600}`;

export default async (req, res) => {
  const placeId = gup("place_id", req.url);
  const key = gup("key", req.url);
  const request = placePhotoSrc(key, placeId);

  const response = await axios.get(request);
  console.log(reponse);
  res.status(200).json(data);
};
