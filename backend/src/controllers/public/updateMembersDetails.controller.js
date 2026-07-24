import CompanyUser from "../../models/CompanyUser.model.js";

export const updateMembersDetails = async (req, res) => {
  try {
    const { id } = req.params;

    //! never allow role to change through this route
    const { role, ...allowedFields } = req.body;

    const member = await CompanyUser.findByIdAndUpdate(
      id,
      { ...allowedFields },
      { new: true, runValidators: true },
    );

    return res.status(200).json({
      success: true,
      message: "members details updated successfully.",
      data: member,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};