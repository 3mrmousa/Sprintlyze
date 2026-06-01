import { TaskModel } from "../models/Task.model";

export const updateParentProgressRecursively = async (taskId: string) => {
  const task = await TaskModel.findById(taskId);

  if (!task || !task.parentTaskId) return;

  const parentId = task.parentTaskId;

  const children = await TaskModel.find({ parentTaskId: parentId });

  if (children.length === 0) return;

  const totalProgress = children.reduce(
    (sum, child) => sum + (child.progress || 0),
    0,
  );

  const progress = Math.round(totalProgress / children.length);

  const completed = progress === 100;

  const updatedParent = await TaskModel.findByIdAndUpdate(
    parentId,
    { progress, completed },
    { returnDocument: "after" },
  );

  if (updatedParent?.parentTaskId) {
    await updateParentProgressRecursively(parentId.toString());
  }
};
