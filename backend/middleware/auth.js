import  jwt  from "jsonwebtoken";
import { User } from "../models/user.schema.js";



export const isAuthenticated = async(req, res, next) =>{  

    const { token } = req.cookies;
    if (!token) {
      return next(
        res.status(401).json({
          success: false,
          message: "User not Authenticated!",
        })
      );
    }
    const decoded = await jwt.verify(token, process.env.JWT_SEC);
    req.user = await User.findById(decoded.id);
    next();
}