import { body } from "express-validator";

export const createTaskValidatorRules = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 3, max: 20 })
    .withMessage("Name must be between 3 and 20 characters"),

  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be a boolean"),

  body("description")
    .notEmpty()
    .isString()
    .withMessage("Description must be a string")
    .isLength({ min: 3, max: 200 })
    .withMessage("Description must be between 3 and 200 characters"),

  body("startDate")
    .notEmpty()
    .isISO8601()
    .withMessage("Start date must be a valid date"),

  body("endDate")
    .notEmpty()
    .isISO8601()
    .withMessage("Start date must be a valid date"),

  body("notes")
    .optional()
    .isString()
    .withMessage("Notes must be a string")
    .isLength({ max: 500 })
    .withMessage("Notes must be at most 500 characters long"),
];

export const updateTaskValidatorRules = [
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 3, max: 20 })
    .withMessage("Name must be between 3 and 20 characters"),

  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be boolean"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .isLength({ min: 3, max: 200 })
    .withMessage("Description must be between 3 and 200 characters"),

  body("startDate")
    .optional()
    .isISO8601()
    .withMessage("Start date must be a valid date"),

  body("notes")
    .optional()
    .isString()
    .withMessage("Notes must be a string")
    .isLength({ max: 500 })
    .withMessage("Notes must be at most 500 characters long"),
];

export const registerValidatorRules = [
  body("firstName")
    .isString()
    .withMessage("First name must be a string")
    .isLength({ min: 2, max: 10 })
    .withMessage("First name must be between 2 and 10 characters"),
  body("lastName")
    .isString()
    .withMessage("Last name must be a string")
    .isLength({ min: 2, max: 10 })
    .withMessage("Last name must be between 2 and 10 characters"),
  body("email").isEmail().withMessage("Email must be a valid email address"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const loginValidatorRules = [
  body("email").isEmail().withMessage("Email must be a valid email address"),

  body("password")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const updateUserValidatorRules = [
  body("firstName")
    .optional()
    .isString()
    .withMessage("First name must be a string")
    .isLength({ min: 2, max: 10 })
    .withMessage("First name must be between 2 and 10 characters"),
  body("lastName")
    .optional()
    .isString()
    .withMessage("Last name must be a string")
    .isLength({ min: 2, max: 10 })
    .withMessage("Last name must be between 2 and 10 characters"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Email must be a valid email address"),
  body("password")
    .optional()
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
