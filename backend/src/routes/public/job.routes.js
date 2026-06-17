import express from "express";
import { jobCreation } from "../../controllers/public/job.controller.js";

import { authMiddleware } from "../../middlewares/index.js";
import { getAllJob } from "../../controllers/public/getAllJob.controller.js";

const jobRouter = express();

jobRouter.post("/jobs", authMiddleware, jobCreation);

jobRouter.get("/fetch/jobs", authMiddleware, getAllJob);

export default jobRouter;