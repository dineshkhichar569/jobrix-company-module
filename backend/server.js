import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connnectDB from "./src/config/mongoose-connection.js";
import authRouter from "./src/routes/authRoutes.js";


dotenv.config();
connnectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World !");
})

app.get("/api/auth", authRouter);


app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
52