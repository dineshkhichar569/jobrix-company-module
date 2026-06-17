import express from "express";
import { authMiddleware } from "../../middlewares/index.js";
import { createCandidate } from "../../controllers/public/addCandidate.controller.js";
import { getAllCandidates } from "../../controllers/public/getAllCandidates.controller.js";


const candidateRouter = express();

candidateRouter.post("/employee/addCandidate", authMiddleware, createCandidate);

candidateRouter.get("/fetch/allCandidate", authMiddleware, getAllCandidates);

export default candidateRouter;