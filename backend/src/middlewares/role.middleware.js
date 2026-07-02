const isRole = (...allowedRoles) => {
  //////////!   here allowedRoles is an array like --> ["admin", "manager"]

  return (req, res, next) => {

    if(!req.role) {
      return res.status(401).json({message: "Role not found"});
    }

    //////////!  here req.role comes from auth middleware (JWT)
    //////////!  cause the isLoggedIn middleware ran before isRole
    //////////!  cause in express req is the same object passed through all middlewares as it is not recreated
    //////////!  so if one middleware adds somethings to req, the all next middlewares can use it.
    if (!allowedRoles.includes(req.role)) {
      return res
        .status(403)
        .json({ message: "Access denied: insufficient permission" });
    }

    next();
  };
};

export default isRole;
