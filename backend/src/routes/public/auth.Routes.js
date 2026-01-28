import express from "express";
import {
  companyRegister,
  loginCompanyUser,
} from "../../controllers/public/authController.controller.js";

const authRouter = express.Router();

authRouter.post("/company/signup", companyRegister);
authRouter.post("/login", loginCompanyUser);

export default authRouter;