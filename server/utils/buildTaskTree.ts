import { TaskModel } from "../models/Task.model";

export const buildTaskTree = async (
  parentId: string,
  userId: string,
): Promise<any> => {
  const children = await TaskModel.find({
    parentTaskId: parentId,
    user: userId,
  }).select("-__v");

  const result = [];

  for (const child of children) {
    const subTree = await buildTaskTree(child._id.toString(), userId);

    result.push({
      ...child.toObject(),
      subTasks: subTree,
    });
  }

  return result;
};
