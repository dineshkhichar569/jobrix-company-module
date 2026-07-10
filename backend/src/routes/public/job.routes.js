import express from "express";
import { jobCreation } from "../../controllers/public/job.controller.js";

import { authMiddleware } from "../../middlewares/index.js";
import { getAllJob } from "../../controllers/public/getAllJob.controller.js";
import { updateJob } from "../../controllers/public/updateJob.controller.js";

const jobRouter = express();

jobRouter.post("/jobs", authMiddleware, jobCreation);

jobRouter.get("/fetch/jobs", authMiddleware, getAllJob);

jobRouter.patch("/jobs/:id", authMiddleware, updateJob);

export default jobRouter;