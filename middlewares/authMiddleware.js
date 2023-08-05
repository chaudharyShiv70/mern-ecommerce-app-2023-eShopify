import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes Token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    // console.log(error);
  }
};

//admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      // when user try to access admin dashboared then it warning 401 with homepage and a error will be shown nevigation will be unAuthorized access
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    // console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in Admin middleware",
    });
  }
};
