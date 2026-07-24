import Company from "../../models/Company.model.js";

export const getCompanyDetails = async (req, res) => {
  try {
    const company = await Company.findById(req.companyId);

    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found." });
    }

    return res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
