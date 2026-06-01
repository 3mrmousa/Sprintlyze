import express from "express";
import {
  createTaskValidatorRules,
  updateTaskValidatorRules,
} from "../utils/validatorRules";
import { validateResult } from "../utils/validatorResult";
import { idValidatorRules } from "../utils/idValidator";
import {
  deleteTask,
  getAllTasks,
  getTask,
  postTask,
  updateTask,
  getParentTask,
  getNotCompleted,
  getCompleted,
} from "../controllers/tasks.controller";
import { protect } from "../middlewares/auth.middleware";

const tasksRouter = express.Router();

tasksRouter
  .route("/")
  .get(protect, getAllTasks)
  .post(protect, createTaskValidatorRules, validateResult, postTask);

tasksRouter.route("/completed").get(protect, getCompleted);
tasksRouter.route("/not-completed").get(protect, getNotCompleted);

tasksRouter
  .route("/:id")
  .get(protect, idValidatorRules, getTask)
  .patch(
    protect,
    idValidatorRules,
    updateTaskValidatorRules,
    validateResult,
    updateTask,
  )
  .delete(protect, idValidatorRules, deleteTask);

tasksRouter
  .route("/parentWithChildren/:id")
  .get(protect, idValidatorRules, getParentTask);

export default tasksRouter;
