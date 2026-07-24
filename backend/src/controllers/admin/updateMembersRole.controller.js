import CompanyUser from "../../models/CompanyUser.model.js";

export const updateMembersRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const member = await CompanyUser.findByIdAndUpdate(
      id,
      { role },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Role updated successfully.",
      data: member,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};