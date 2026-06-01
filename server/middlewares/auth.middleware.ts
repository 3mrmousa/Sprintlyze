import { NextFunction, Response,  Request } from "express";
import { AppError } from "../utils/appError";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/authRequest";

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {

  const token = req.cookies?.token;

  if (!token) {
    return next(new AppError("Not authenticated", 401));
  }

  const secret = process.env.JWT_SECRET as string;

  if (!secret) {
    return next(new AppError("JWT secret not configured", 500));
  }

  try {
    const decoded = jwt.verify(token, secret) as { id: string };

    req.user = {
      id: decoded.id,
    };

    next();
  } catch (error) {
    return next(new AppError("Invalid or expired token", 401));
  }
};
