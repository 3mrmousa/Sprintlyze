"use client";

import { Task, TaskRespond } from "@/app/types/tasks";
import TaskCard from "../shared/TaskCard";

function ShowTasks({ tasks }: { tasks: TaskRespond }) {
  return (
    <>
      {tasks.data.tasks.length ? (
        tasks.data.tasks.map((task: Task) => {
          return (
            <TaskCard
              key={task._id}
              name={task.name}
              description={task.description}
              endDate={new Date(task.endDate).toLocaleDateString()}
              completed={task.completed}
              progress={task.progress}
              taskId={task._id}
            />
          );
        })
      ) : (
        <p
          className="font-bold text-text-muted text-2xl 
        md:col-span-2 lg:col-span-3"
        >
          No Tasks Yet
        </p>
      )}
    </>
  );
}

export default ShowTasks;
