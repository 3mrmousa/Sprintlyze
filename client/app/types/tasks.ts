export type Task = {
  _id: string;
  name: string;
  description: string;
  notes: string;
  progress: number;
  completed: boolean;
  parentTaskId: string | null;
  startDate: string;
  endDate: string;
  user: string;
}


export type TaskRespond = {
  status: string,
  data : {
    "tasks" : Task[]
  }
}