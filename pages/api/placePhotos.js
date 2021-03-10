// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import gup from "./gup";

const placePhotoSrc = (key, photoreference) =>
  `https://maps.googleapis.com/maps/api/place/photo?key=${key}&photoreference=${photoreference}&maxheight=${1600}`;

export default async (req, res) => {
  const photoReference = gup("photoreference", req.url);
  const key = gup("key", req.url);
  const request = placePhotoSrc(key, photoReference);

  const response = await axios.get(request);
  res.status(200).json({ src: response.request.res.responseUrl });
};
