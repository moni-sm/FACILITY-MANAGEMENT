// Middleware to verify the role of the user
export const verifyRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied." });
    }
    console.log("request,responce",req.user.role);
    next();
  };
};

