import express from "express";
import { registerRecruiter } from "../../controllers/admin/recruiter.controller.js";
import { authMiddleware, roleMiddleware } from "../../middlewares/index.js";
import { getAllMembers } from "../../controllers/admin/getAllMembers.controller.js";
import { updateMembersRole } from "../../controllers/public/updateMembersRole.controller.js";

const recruiterRouter = express();

recruiterRouter.post(
  "/registerRecruiter",
  authMiddleware,
  roleMiddleware("admin"),
  registerRecruiter
);

recruiterRouter.get(
  "/members",
  authMiddleware,
  roleMiddleware("admin"),
  getAllMembers
);

recruiterRouter.patch(
  "/members/:id/role",
  authMiddleware,
  roleMiddleware("admin"),
  updateMembersRole
);


export default recruiterRouter;