import express from "express";
import { addFilms, getFilms } from "../controllers/filmController"; // Ensure the path is correct

const route = express.Router();

route.get('/getfilms', getFilms);
route.post('/addfilms', addFilms);

export default route;
