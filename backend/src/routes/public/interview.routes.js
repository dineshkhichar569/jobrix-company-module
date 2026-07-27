import express from "express";
import { authMiddleware } from "../../middlewares/index.js";
import { createInterview } from "../../controllers/public/createinterview.controller.js";
import { submitInterviewFeedback } from "../../controllers/public/submitInterviewFeedback.controller.js";
import { getAllInterviews } from "../../controllers/public/getAllInterviews.controller.js";

const interviewRouter = express.Router();

//! schedule a new interview (auto-sets candidate to "Interview Scheduled")
interviewRouter.post("/", authMiddleware, createInterview);

//! list interviews (admin: all, others: only their own)
interviewRouter.get("/", authMiddleware, getAllInterviews);

//! submit feedback + advance candidate (marks interview Completed)
interviewRouter.patch("/:id/feedback", authMiddleware, submitInterviewFeedback);

export default interviewRouter;
