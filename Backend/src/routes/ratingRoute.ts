import express  from "express";
import { addOrUpdateRating, getRating } from "../controllers/ratingreviewControlller";
const route = express.Router();

route.post("/addrating", addOrUpdateRating);
route.get("/getrating/:userId/:filmId", getRating);

export default route;
