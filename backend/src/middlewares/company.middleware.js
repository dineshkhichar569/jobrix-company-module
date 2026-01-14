////////  This middleware checks if the user belongs to the same company or not.
const isCompany = (req, res, next) => {
  const userCompanyId = req.companyId;

  //// req.params.companyId   ==> comes from URL
  //// req.body.companyId   ==> comes from URL
  const requestCompanyId = req.body.companyId || req.params.companyId;

  if (!requestCompanyId) {
    return res.status(400).json({ message: "Company ID is required" });
  }

  if (requestCompanyId !== userCompanyId) {
    return res.status(403).json({ message: "Access denied for this company" });
  }

  next();
};

export default isCompany;
