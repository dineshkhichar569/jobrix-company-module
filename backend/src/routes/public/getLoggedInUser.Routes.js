import express from "express";
import { getLoggedInUser } from "../../controllers/public/getLoggedInUser.controller.js";
import { authMiddleware } from "../../middlewares/index.js";

const loggedInRouter = express();

loggedInRouter.get("/me", authMiddleware ,getLoggedInUser);

export default loggedInRouter;