import Company from "../../models/Company.model.js";

export const updateCompanyDetails = async (req, res) => {
  try {
    const { companyName, domain, industry, companySize, location } = req.body;

    const company = await Company.findByIdAndUpdate(
      req.companyId,
      { companyName, domain, industry, companySize, location },
      { new: true, runValidators: true },
    );

    return res.status(200).json({
      success: true,
      message: "Company updated successfully.",
      data: company,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};