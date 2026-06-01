import express from "express";
import {
  getMe,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  register,
  login,
  logout,
} from "../controllers/users.controller";
import {
  loginValidatorRules,
  registerValidatorRules,
  updateUserValidatorRules,
} from "../utils/validatorRules";
import { validateResult } from "../utils/validatorResult";
import { idValidatorRules } from "../utils/idValidator";
import { protect } from "../middlewares/auth.middleware";

const usersRouter = express.Router();

usersRouter.route("/").get(protect, getAllUsers);

usersRouter.post("/register", registerValidatorRules, validateResult, register);

usersRouter.post("/login", loginValidatorRules, validateResult, login);

usersRouter.post("/logout", protect, logout);

usersRouter.get("/me", protect, getMe);

usersRouter
  .route("/:id")
  .get(idValidatorRules, protect, getUser)
  .patch(
    idValidatorRules,
    protect,
    updateUserValidatorRules,
    validateResult,
    updateUser,
  )
  .delete(idValidatorRules, protect, deleteUser);

export default usersRouter;
