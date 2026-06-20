import express from "express";
import { authMiddleware } from "../../middlewares/index.js";
import { createCandidate } from "../../controllers/public/addCandidate.controller.js";
import { getAllCandidates } from "../../controllers/public/getAllCandidates.controller.js";
import { updateCandidateStatus } from "../../controllers/public/updateCandidateStatus.controller.js";


const candidateRouter = express();

candidateRouter.post("/employee/addCandidate", authMiddleware, createCandidate);

candidateRouter.get("/fetch/allCandidate", authMiddleware, getAllCandidates);

candidateRouter.patch("/candidates/:id/status", authMiddleware, updateCandidateStatus);

export default candidateRouter;