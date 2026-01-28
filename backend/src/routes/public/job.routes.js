import express from "express";
import { jobCreation } from "../../controllers/public/job.controller.js";

import { authMiddleware } from "../../middlewares/index.js";
// import { getAllJobs } from "../../../../frontend/src/api/index.js";

const jobRouter = express();

jobRouter.post("/jobs", authMiddleware, jobCreation);

// jobRouter.get("/fetch/jobs", getAllJobs);

export default jobRouter;
