import express from "express";

import { getCompanyDetails } from "../../controllers/admin/getCompanyDetails.controller.js";
import { authMiddleware, roleMiddleware } from "../../middlewares/index.js";
import { updateCompanyDetails } from "../../controllers/admin/updateCompanyDetails.controller.js";

const companyRouter = express();

companyRouter.get(
  "/company",
  authMiddleware,
  getCompanyDetails
);

companyRouter.patch(
  "/company",
  authMiddleware,
  updateCompanyDetails
);

export default companyRouter;