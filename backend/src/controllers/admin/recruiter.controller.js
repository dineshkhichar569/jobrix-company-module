import CompanyUser from "../../models/CompanyUser.model.js";
import bcrypt from "bcrypt";
import generateToken from "../../utiles/generateToken.js";

export const registerRecruiter = async (req, res) => {
  try {
    const { fullname, email, phoneNo, role, department, password } = req.body;

    const user = await CompanyUser.findOne({ email });
    if (user) {
      return res
        .status(401)
        .json({ message: "This email is already registered." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userCreate = await CompanyUser.create({
      companyId: req.companyId,
      fullname,
      email,
      phoneNo,
      role,
      department,
      password: hashedPassword,
    });

    const token = generateToken({
      companyId: req.companyId,
      userId: userCreate._id,
      role: userCreate.role,
    });

    return res.status(201).json({
      message: "Recruiter registerd successfully.",
      token,
      company: {
        companyId: req.companyId,
      },
      user: {
        id: userCreate._id,
        fullname: userCreate.fullname,
        email: userCreate.email,
        phoneNo: userCreate.phoneNo,
        role: userCreate.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};