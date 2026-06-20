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

usersRouter.post("/register", registerValidatorRules, validateResult, register);
usersRouter.post("/login", loginValidatorRules, validateResult, login);

usersRouter.use(protect);

usersRouter.route("/").get(getAllUsers);
usersRouter.post("/logout", logout);
usersRouter.get("/me", getMe);
usersRouter
  .route("/:id")
  .get(idValidatorRules, validateResult, getUser)
  .patch(idValidatorRules, updateUserValidatorRules, validateResult, updateUser)
  .delete(idValidatorRules, validateResult, deleteUser);

export default usersRouter;
