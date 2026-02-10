import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connnectDB from "./src/config/mongoose-connection.js";

/////////////////   Routes  ///////////////////
import authRouter from "./src/routes/public/auth.Routes.js";
import jobRouter from "./src/routes/public/job.routes.js";
import recruiterRouter from "./src/routes/admin/recruiter.routes.js";
import loggedInRouter from "./src/routes/public/getLoggedInUser.Routes.js";


dotenv.config();
connnectDB();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World !");
})


// Routes /////'
app.use("/api/auth", authRouter);
app.use("/api/admin", recruiterRouter);
app.use("/api", jobRouter);
app.use("/api", loggedInRouter);


app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});