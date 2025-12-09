import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../models/db.js";

////// To generate Token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
};

//////////////////////////////////  To Register  ///////////////////////////////////////
export const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, mobile_no, gender } =
      req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All feilds are required...." });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    // now to check if the email esists or not
    const exist = await pool.query(
      "SELECT id FROM users WHERE email = $1 OR username = $2",
      [email.toLowerCase(), username]
    );

    if (exist.rows.length > 0) {
      const existing = exist.rows[0];

      if (existing.email === email.toLowerCase()) {
        return res.status(400).json({ message: "Email already registered" });
      }
      if (existing.username === username) {
        return res.status(400).json({ message: "Username already taken" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = `INSERT INTO users (username, email, password, mobile_no, gender)
                         VALUES ($1, $2, $3, $4, $5)
                         RETURNING id, username, email, mobile_no, gender, created_at`;

    const values = [
      username,
      email.toLowerCase(),
      hashedPassword,
      mobile_no || null,
      gender || null,
    ];

    const result = await pool.query(insertQuery, values);

    const user = result.rows[0];
    const token = generateToken(user);

    res.status(201).json({
      message: "Registration Successful",
      user,
      token,
    });
  } catch (error) {
    console.error("Register error: ", error);

    /////// To handle unique constraint from Postgre
    if (error.constraint === "unique_username") {
      return res.status(400).json({ message: "Username already taken" });
    }
    if (error.constraint === "unique_email") {
      return res.status(400).json({ message: "Email already registered" });
    }

    res.status(500).json({ message: "server error" });
  }
};

//////////////////////////////////  Login  ///////////////////////////////////////

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and Password required." });
    }

    ///// to check if email exist or not
    const exist = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    if (exist.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials." });
    }


    /////  this user take data of a user from database to compare password and to generate token
    const user = exist.rows[0];

    ////  to check password is correct or not
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    ////// to generate token for a specific user
    const token = generateToken(user);

    return res.json({
      message: "Login Successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.error("Login error: ", err);
    return res.status(500).json({ message: "Server error during Login." });
  }
};
