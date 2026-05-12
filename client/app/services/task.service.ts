import { api } from "./api";

export const getTasks = () => {
  return api("/tasks", {});
};

export const getCompletedTasks = () => {
  return api("/tasks/completed", {});
};

export const getNotCompletedTasks = () => {
  return api("/tasks/not-completed", {});
};

export const getTask = (id: string) => {
  return api(`/tasks/${id}`, {});
};

export const getTaskWithSubTasks = (id: string) => {
  return api(`/tasks/parentWithChildren/${id}`, {});
};

export const postTask = (
  name: string,
  description: string,
  notes: string,
  startDate: string,
  endDate: string,
  parentTaskId?: string | null,
) => {
  return api("/tasks", {
    method: "POST",
    body: JSON.stringify({
      name,
      description,
      notes,
      startDate,
      endDate,
      parentTaskId,
    }),
  });
};

export const updateTask = (
  id: string,
  name?: string,
  description?: string,
  note?: string,
  startDate?: string,
  endDate?: string,
) => {
  return api(`/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      name,
      description,
      note,
      startDate,
      endDate,
    }),
  });
};

export const updateTaskCompletion = (id: string, completed: boolean) => {
  return api(`/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      completed,
    }),
  });
};

export const deleteTask = (id: string) => {
  return api(`/tasks/${id}`, {
    method: "DELETE",
  });
};
