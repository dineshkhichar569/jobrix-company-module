import express from "express";
import { authMiddleware } from "../../middlewares";
import { createCandidate } from "../../controllers/public/addCandidate.controller";


const candidateRouter = express();

candidateRouter.post("/employee/addCandidate", authMiddleware, createCandidate);