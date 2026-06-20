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

tasksRouter.use(protect);

tasksRouter
  .route("/")
  .get(getAllTasks)
  .post(createTaskValidatorRules, validateResult, postTask);

tasksRouter.route("/completed").get(getCompleted);
tasksRouter.route("/not-completed").get(getNotCompleted);

tasksRouter
  .route("/:id")
  .get(idValidatorRules, validateResult, getTask)
  .patch(idValidatorRules, updateTaskValidatorRules, validateResult, updateTask)
  .delete(idValidatorRules, validateResult, deleteTask);

tasksRouter
  .route("/parentWithChildren/:id")
  .get(idValidatorRules, validateResult, getParentTask);

export default tasksRouter;
