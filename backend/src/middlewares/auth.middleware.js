import jwt from "jsonwebtoken";

const isLoggedIn = async (req, res, next) => {
  ////////// Read Authorization header from request
  ////  expected formate ==>  Authorization: Bearer <TOKEN>
  const authHeader = req.headers.authorization;

  //////  to check is header exists AND starts with "Bearer"
  if (!authHeader || !authHeader.startswith("Bearer")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  /////////  now for to extract the actual token from header
  ////  Example: "Bearer abc.def.ghi...." --> ["Bearer". "abc.def.ghi...."]
  const token = authHeader.split(" ")[1];

  try {
    ////////  to verify token with jwt secret key
    ////// if fails the it goes to catch block
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /// to save user details inside request
    /// so controller knows who is calling API
    req.userId = decoded.userId;
    req.companyId = decoded.companyId;
    req.role = decoded.role;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default isLoggedIn;
