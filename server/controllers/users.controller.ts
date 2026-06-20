import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { UserModel } from "../models/User.model";
import { AppError } from "../utils/appError";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";
import { AuthRequest } from "../types/authRequest";
import { isVercel } from "../utils/env";

const cookieSecurityOptions = {
  secure: isVercel,
  sameSite: (isVercel ? "none" : "lax") as "none" | "lax",
};

const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await UserModel.find().select("-__v -password");
  res.status(200).json({ status: "success", data: { users } });
});

const getUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = await UserModel.findById(id).select("-__v -password");

    if (!user) {
      return next(new AppError("User not found", 404));
    }
    res.status(200).json({ status: "success", data: { user } });
  },
);

const updateUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!(await UserModel.findById(id))) {
      return next(new AppError("User not found", 404));
    }
    const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ status: "success", data: { user } });
  },
);

const deleteUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!(await UserModel.findById(id))) {
      return next(new AppError("User not found", 404));
    }

    await UserModel.findByIdAndDelete(id);
    res.status(200).json({ status: "success", data: null });
  },
);

const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!process.env.JWT_SECRET) {
      return next(new AppError("Server configuration error", 500));
    }

    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return next(new AppError("Email already in use", 409));
    }

    const user = await UserModel.create(req.body);

    const token = generateToken(user._id.toString());

    const userObj = user.toObject() as any;
    delete userObj.password;
    delete userObj.__v;

    res.cookie("token", token, {
      httpOnly: true,
      ...cookieSecurityOptions,
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      status: "success",
      token,
      data: { user: userObj },
    });
  },
);

const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!process.env.JWT_SECRET) {
      return next(new AppError("Server configuration error", 500));
    }

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return next(new AppError("Invalid email or password", 401));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new AppError("Invalid email or password", 401));
    }

    const token = generateToken(user._id.toString());

    const userObj = user.toObject() as any;
    delete userObj.password;
    delete userObj.__v;

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      status: "success",
      data: { user: userObj },
    });
  },
);

const logout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    ...cookieSecurityOptions,
    path: "/",
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
});

const getMe = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user?.id) {
      return next(new AppError("Not authenticated", 401));
    }
    const user = await UserModel.findById(req.user.id).select("-password -__v");
    if (!user) {
      return next(new AppError("User not found", 404));
    }
    res.status(200).json({ status: "success", data: { user } });
  },
);

export {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  register,
  login,
  logout,
  getMe,
};
