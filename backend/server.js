import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./src/models/db.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/db-test", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT NOW()");
    console.log("DB test rows:", rows);

    if (!rows || rows.length === 0) {
      return res.status(500).json({ message: "No rows returned from DB" });
    }

    res.json({ db_time: rows[0].now });
  } catch (err) {
    console.error("DB test error:", err);
    res.status(500).json({ message: "DB error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
