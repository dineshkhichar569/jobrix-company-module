import express from "express";
import { companyRegister, loginCompanyUser } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/companyRegister", companyRegister);
authRouter.post("/companyUser", loginCompanyUser);

export default authRouter;
