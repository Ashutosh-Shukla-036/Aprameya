import { Router } from "express";
import { addOrUpdateReview, getAllReviews, getReviewsForFilm, deleteReview, getReviewsForUser, likeReview } from "../controllers/reviewController";

const route = Router();

route.post("/addreview", addOrUpdateReview);

route.get("/getreviews", getAllReviews);

route.get("/getfilmreview/:filmTitle", getReviewsForFilm);

route.get("/getuserreview/:userId", getReviewsForUser);

route.delete("/deletereview/:reviewId", deleteReview);

route.post("/like", likeReview);

export default route;
