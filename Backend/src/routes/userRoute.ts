import express from "express";
import { Login, SignUp } from "../controllers/userController";
const route = express.Router();

route.post('/signup', SignUp);
route.post('/login', Login);

export default route;