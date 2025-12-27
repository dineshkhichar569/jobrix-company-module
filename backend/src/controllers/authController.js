import bcrypt from "bcrypt";

import Company from "../models/Company.js";
import CompanyUser from "../models/CompanyUser.js";

////// To generate Token
import generateToken from "../utiles/generateToken.js";

//////////////////////////////////  For Company Register and First Admin registeration  ///////////////////////////////////////

export const companyRegister = async (req, res) => {
  try {
    ///// cause here req.body is an object coming from frontend
    const {
      companyName,
      domain,
      industry,
      companySize,
      location,
      adminName,
      adminEmail,
      adminPassword,
    } = req.body;

    /// to  check if (company already exists or not.)
    const existingComapny = await Company.findOne({ domain });
    if (existingComapny) {
      return res.status(400).json({
        message: "Comapny with this domain already exists",
      });
    }

    /// else (now to create comapny)
    const company = await Company.create({
      companyName,
      domain,
      industry,
      companySize,
      location,
    });

    //////   for to convert admin password to Hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    ///// for to create first company User admin
    const adminUser = await CompanyUser.create({
      // _id is unique and auto-generated and primary key of that company
      companyId: company._id,
      fullname: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    ////// to Generate JWT
    //////////   without user have to login again and again
    const token = generateToken({
      userId: adminUser._id,
      comapnyId: company._id,
      role: adminUser.role,
    });

    //////  for to Response
    res.status(201).json({
      message: "Company created successfully",
      token,
      company: {
        id: company._id,
        name: company.companyName,
        domain: company.domain,
      },
      user: {
        id: adminUser._id,
        name: adminUser.fullname,
        email: adminUser.email,
        role: adminUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//////////////////////////////////  For Company Users can Login and come back  ///////////////////////////////////////

export const loginCompanyUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    ///////  can't left the blank empty
    if (!email || !password) {
      return res.status(400).json({ message: "Email and passwword required." });
    }

    //  to check if email exists or not
    const existUser = await CompanyUser.findOne({ email });
    if (!existUser) {
      return res.status(401).json({ message: "Email or Password Incorrect." });
    }


    console.log("REQ PASSWORD:", password);
console.log("DB PASSWORD:", existUser.password);
console.log("USER DOC:", existUser);


    // check password is correct or not
    const isMatch = await bcrypt.compare(password, existUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email or Password Incorrect." });
    }

    /////  to check accout is active or not
    if (!existUser.isActive) {
      return res.status(403).json({ message: "Account is deactivated" });
    }

    ////   to Generate  Token
    const token = generateToken({
      userId: existUser._id,
      companyId: existUser.company._id,
      role: existUser.role,
    });

    ////// to send Responnse
    res.status(200).json({
      message: "Login successful",
      token,
      existUser: {
        id: existUser._id,
        fullname: existUser.fullname,
        email: existUser.email,
        role: existUser.role,
        companyId: existUser.company._id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
