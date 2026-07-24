import CompanyUser from "../../models/CompanyUser.model.js";

export const deactivateMember = async (req, res) => {
  try {
    const { id } = req.params;

    //! an admin can't deactivate their own account
    if (id === req.userId) {
      return res.status(400).json({
        success: false,
        message: "You can't deactivate your own account.",
      });
    }

    const member = await CompanyUser.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    ).select("-password");

    if (!member) {
      return res.status(404).json({ success: false, message: "Member not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Member deactivated successfully.",
      data: member,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};