import CompanyUser from "../../models/CompanyUser.model.js";

export const getLoggedInUser = async (req, res) => {
  try {
    const user = await CompanyUser.findById(req.userId).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};