import CompanyUser from "../../models/CompanyUser.model.js";

export const activateMember = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await CompanyUser.findByIdAndUpdate(
      id,
      { isActive: true },
      { new: true },
    ).select("-password");

    if (!member) {
      return res
        .status(404)
        .json({ success: false, message: "Member not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Member activated successfully.",
      data: member,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
