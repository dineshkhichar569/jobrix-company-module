import express from "express";
import { authMiddleware } from "../../middlewares/index.js";
import { createCandidate } from "../../controllers/public/addCandidate.controller.js";


const candidateRouter = express();

candidateRouter.post("/employee/addCandidate", authMiddleware, createCandidate);

export default candidateRouter;