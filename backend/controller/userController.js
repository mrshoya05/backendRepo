import { User } from "../models/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const { name, email, phone, password } = req.body;
  console.log(name, email, phone, password)
  if (!name || !email || !phone || !password) {
    return next(
      res.status(400).json({
        success: false,
        message: "Pleaes fill full form.",
      })
    );
  }
  const isUser = await User.findOne({ email });
  if (isUser) {
    return next(
      res.status(400).json({
        success: false,
        message: "User already exists!",
      })
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
  });
  res.status(200).json({
    success: true,
    message: "User Registered!",
    user,
  });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill full form!",
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    return res.status(404).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SEC, {
    expiresIn: process.env.JWT_EXP,
  });

  // Convert COOKIE_EXPI to milliseconds
  const cookieExpiry = process.env.COOKIE_EXPI.endsWith('h')
    ? parseInt(process.env.COOKIE_EXPI) * 60 * 60 * 1000
    : parseInt(process.env.COOKIE_EXPI) * 1000;

  res
    .status(200)
    .cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + cookieExpiry),
      secure : true,
      sameSite: "None"
    })
    .json({
      success: true,
      message: 'User logged in.',
      user,
      token,
    });
};
export const getUser = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(
      res.status(404).json({
        success: false,
        message: "User not found!",
      })
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
};

export const logout = async (req, res, next) => {
  res.status(200).cookie("token", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  }).json({
    success: true,
    message : "User logged out."
  })
};