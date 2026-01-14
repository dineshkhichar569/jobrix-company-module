import express from "express";
import { jobCreation } from "../../controllers/admin/job.controller.js";

import {
  authMiddleware,
  roleMiddleware,
} from "../../middlewares/index.js";

const jobRouter = express();

jobRouter.post(
  "/jobs",
  authMiddleware,
  roleMiddleware("admin", "recruiter"),
  jobCreation
);

export default jobRouter;
