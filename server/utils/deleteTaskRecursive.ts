import { TaskModel } from "../models/Task.model";

export const deleteTaskRecursive = async (taskId: string) => {
  const children = await TaskModel.find({ parentTaskId: taskId });

  for (const child of children) {
    await deleteTaskRecursive(child._id.toString());
  }
  await TaskModel.findByIdAndDelete(taskId);
};
