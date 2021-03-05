// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import gup from "./gup";

const nearbyRestaurantsEndpoint = (lat, lng, radius, key, pageToken) =>
  `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=restaurant&key=${key}&` +
  (pageToken ? `pagetoken=${pageToken}` : "");

export default async (req, res) => {
  const lat = gup("lat", req.url);
  const lng = gup("lng", req.url);
  const radius = gup("radius", req.url);
  const key = gup("key", req.url);
  const pagetoken = gup("pageToken", req.url);
  const request = nearbyRestaurantsEndpoint(lat, lng, radius, key, pagetoken);
  const {
    data: { results, next_page_token },
  } = await axios.get(request);

  res.status(200).json({ results, next_page_token });
};
