import { param } from "express-validator";

export const idValidatorRules = [
  param("id").isMongoId().withMessage("Invalid ID format"),
];
