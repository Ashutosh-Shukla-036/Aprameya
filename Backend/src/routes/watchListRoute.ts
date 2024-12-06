import express from "express";
import { addWatchList, deleteWatchList, getWatchList } from "../controllers/watchListController";

const route = express.Router();

route.post("/addwatchlist", addWatchList);
route.get("/getwatchlist/:userId", getWatchList);
route.delete("/deletewatchlist/:id", deleteWatchList);

export default route;
