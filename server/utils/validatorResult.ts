import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { AppError } from "./appError";

export const validateResult = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new AppError("Validation failed", 400, errors.array()));
  }

  next();
};
