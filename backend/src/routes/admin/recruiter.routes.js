import express from "express";
import { registerRecruiter } from "../../controllers/admin/recruiter.controller.js";
import { authMiddleware, roleMiddleware } from "../../middlewares/index.js";
import { getAllMembers } from "../../controllers/admin/getAllMembers.controller.js";
import { updateMembersRole } from "../../controllers/admin/updateMembersRole.controller.js";
import { updateMembersDetails } from "../../controllers/public/updateMembersDetails.controller.js";
import { updatePassword } from "../../controllers/public/updatePassword.controller.js";

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
  "/members/change-password",
  authMiddleware,
  updatePassword
);

recruiterRouter.patch(
  "/members/:id/role",
  authMiddleware,
  roleMiddleware("admin"),
  updateMembersRole
);

recruiterRouter.patch(
  "/members/:id",
  authMiddleware,
  updateMembersDetails
);



export default recruiterRouter;