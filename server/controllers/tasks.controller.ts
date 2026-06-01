import { NextFunction, Request, Response } from "express";
import { TaskModel } from "../models/Task.model";
import { asyncHandler } from "../utils/asyncHandler";
import { AppError } from "../utils/appError";
import { AuthRequest } from "../types/authRequest";
import { updateParentProgressRecursively } from "../utils/progress";
import { deleteTaskRecursive } from "../utils/deleteTaskRecursive";
import { buildTaskTree } from "../utils/buildTaskTree";

const getAllTasks = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;

  const tasks = await TaskModel.find({ user: userId }).select("-__v");

  res.status(200).json({
    status: "success",
    data: { tasks },
  });
});

const getCompleted = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const tasks = await TaskModel.find({ user: userId, completed: true }).select(
    "-__v",
  );

  res.status(200).json({
    status: "success",
    data: { tasks },
  });
});

const getNotCompleted = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    const tasks = await TaskModel.find({
      user: userId,
      completed: false,
    }).select("-__v");

    res.status(200).json({
      status: "success",
      data: { tasks },
    });
  },
);

const postTask = asyncHandler(async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;

  const task = await TaskModel.create({
    ...req.body,
    user: userId,
  });

  if (task.parentTaskId) {
    await updateParentProgressRecursively(task._id.toString());
  }

  res.status(201).json({ status: "success", data: { task } });
});

const getTask = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const { id } = req.params;
    const task = await TaskModel.findOne({
      _id: id,
      user: userId,
    }).select("-__v");

    if (!task) {
      return next(new AppError("Task not found or not authorized", 404));
    }
    res.status(200).json({ status: "success", data: { task } });
  },
);

const updateTask = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const { id } = req.params;

    const task = await TaskModel.findOneAndUpdate(
      { _id: id, user: userId },
      req.body,
      { returnDocument: "after", runValidators: true },
    );

    if (!task) {
      return next(new AppError("Task not found or not authorized", 404));
    }

    const children = await TaskModel.find({ parentTaskId: task._id });

    if (!children.length) {
      await TaskModel.findByIdAndUpdate(id, {
        progress: task.completed ? 100 : 0,
      });
    } else {
      const cascadeUpdate = async (taskId: string, completed: boolean) => {
        const children = await TaskModel.find({ parentTaskId: taskId });

        for (const child of children) {
          await TaskModel.findByIdAndUpdate(child._id, {
            completed,
            progress: completed ? 100 : 0,
          });
          await cascadeUpdate(child._id.toString(), completed);
        }
      };

      await cascadeUpdate(task._id.toString(), task.completed);
      await TaskModel.findByIdAndUpdate(id, {
        progress: task.completed ? 100 : 0,
      });
    }

    await updateParentProgressRecursively(task._id.toString());

    const updatedTask = await TaskModel.findById(id).select("-__v");

    res.status(200).json({ status: "success", data: { task: updatedTask } });
  },
);

const deleteTask = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const { id } = req.params;

    const task = await TaskModel.findOne({ _id: id, user: userId });

    if (!task) {
      return next(new AppError("Task not found or not authorized", 404));
    }

    await deleteTaskRecursive(id.toString());

    if (task.parentTaskId) {
      await updateParentProgressRecursively(task.parentTaskId.toString());
    }

    res.status(200).json({ status: "success", data: null });
  },
);

const getParentTask = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const { id } = req.params;

    const parentTask = await TaskModel.findOne({
      _id: id,
      user: userId,
    }).select("-__v");

    if (!parentTask) {
      return next(new AppError("Parent task not found", 404));
    }

    const subTasks = await buildTaskTree(id.toString(), userId!.toString());

    res.status(200).json({ status: "success", data: { parentTask, subTasks } });
  },
);

export {
  getAllTasks,
  postTask,
  getTask,
  updateTask,
  deleteTask,
  getParentTask,
  getNotCompleted,
  getCompleted,
};
