import CompanyUser from "../../models/CompanyUser.model.js";

export const getAllMembers = async (req, res) => {
  try {
    const members = await CompanyUser.find({
      companyId: req.companyId,
    }).select("-password");
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
