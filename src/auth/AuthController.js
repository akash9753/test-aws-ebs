import { Roles } from "../common/constants/constant.js";
import UserModel from "../user/UserModel.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

const { sign } = jwt;

export const register = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return next(createHttpError(400, result.array()[0].msg));
  }
  console.log(req.body);
  const {
    firstName,
    lastName,
    email,
    mobile,
    password,
    confirmPassword,
    city,
    country,
    address,
  } = req.body;

  const existingUser = await UserModel.findOne({ email });
  console.log(existingUser);
  if (existingUser) {
    return next(createHttpError(400, "Email already exists"));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const hashedconfirmPassword = await bcrypt.hash(confirmPassword, 10);

  let user = {};

  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;
  user.mobile = mobile;
  user.password = hashedPassword;
  user.confirmPassword = hashedconfirmPassword;
  user.city = "";
  user.country = "";
  user.address = [];
  user.profileImage = "";
  user.role = Roles.USER;

  console.log(user);

  const newUser = await UserModel.create(user);

  const newUserData = newUser.toObject();
  delete newUserData.password;
  delete newUserData.confirmPassword;

  res.status(200).json({ status: true, data: newUserData });
};

export const login = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return next(createHttpError(400, result.array()[0].msg));
  }
  const { email, password } = req.body;

  const user = await await UserModel.findOne({ email });
  if (!user) {
    const error = createHttpError(400, "Email or password does not match.");
    next(error);
    return;
  }
  // console.log(user);

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    const error = createHttpError(400, "Email or password does not match.");
    next(error);
    return;
  }

  // console.log("user",user);

  const payload = {
    userId: user._id,
    role: user.role,
  };
  // console.log(`payload`,payload);

  let privateKey = process.env.SECRET_KEY;
  //   console.log(privateKey);

  const accessToken = sign(payload, privateKey, {
    algorithm: "HS256",
    expiresIn: "1h",
    issuer: "auth",
  });
  const cookieName = `accessToken_${user._id}`;

  // res.cookie(cookieName, accessToken, {
  //   //domain: process.env.NODE_ENV === 'production' ? 'pghustul.xyz' : 'https://chipper-biscochitos-baa71e.netlify.app',
  //   domain:
  //     process.env.NODE_ENV === "production"
  //       ? "https://chipper-biscochitos-baa71e.netlify.app"
  //       : "localhost",
  //   sameSite: "None", // 'None' allows cross-site cookie
  //   secure: true, // ensure cookies are sent over HTTPS
  //   maxAge: 1000 * 60 * 60, // 1h
  //   httpOnly: true, // important for security
  // });

  

  res.json({ status: true,data:user, token: accessToken });
};

export const self = async (req, res) => {
  if (!req.auth || typeof req.auth.userId !== "string") {
    res.status(401).json({ message: "Unauthorized Access" });
  }

  const user = await UserModel.findOne({ _id: req.auth.userId }).lean();
  delete user.password;
  delete user.confirmPassword;
  res.json({ status: true, data: user });
};

export const logout = async (req, res, next) => {
  try {
    const cookieNames = Object.keys(req.cookies);
    
    console.log(cookieNames[0]);
    res.clearCookie(cookieNames[0]);
    res.json({});
  } catch (err) {
    next(err);
    return;
  }
};
