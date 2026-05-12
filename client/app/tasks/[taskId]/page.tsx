import TaskCard from "@/app/components/shared/TaskCard";
import DeleteTask from "@/app/components/task-page/DeleteTask";
import EditTask from "@/app/components/task-page/EditTask";
import TaskCompletionButton from "@/app/components/task-page/TaskCompletionButton";
import { getTask, getTaskWithSubTasks } from "@/app/services/task.service";
import { Task as TaskType } from "@/app/types/tasks";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const { taskId } = await params;
  try {
    const task = await getTask(taskId);
    const t: TaskType = task.data.task;

    return {
      title: t.name || "Task",
      description: t.description || "",
      robots: {
        index: false,
        follow: false,
      },
    };
  } catch {
    return {
      title: "Task",
      description: "Task details",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

async function Task({ params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = await params;
  const task = await getTask(taskId);
  const t: TaskType = task.data.task;

  const parentTask = t.parentTaskId ? await getTask(t.parentTaskId) : null;

  const taskSubTasks = await getTaskWithSubTasks(taskId);
  const taskSubTasksData = taskSubTasks.data.subTasks;

  const progress = t.progress ?? 0;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center text-text pt-20 pb-10 px-4 mt-5">
      <div className="w-full max-w-3xl mb-6">
        <Link
          href="/tasks"
          className="flex items-center gap-2 text-text-muted hover:text-primary transition duration-200 text-sm"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Tasks
        </Link>
      </div>

      <div className="w-full max-w-3xl bg-card-modal border border-primary/20 rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-linear-to-r from-primary/20 to-secondary/10 px-8 py-6 border-b border-primary/20">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl font-bold text-text-emphasis">{t.name}</h1>

            <TaskCompletionButton taskId={t._id} taskCompletion={t.completed} />
          </div>
        </div>

        <div className="px-8 py-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Progress</span>
              <span className="text-primary font-semibold">{progress}%</span>
            </div>
            <div className="w-full bg-surface rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full bg-linear-to-r from-primary to-secondary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="border-t border-primary/10" />

          <div className="flex flex-col gap-2">
            <h2 className="text-text-accent font-semibold text-sm uppercase tracking-wider">
              Description
            </h2>
            <p className="text-text-muted leading-relaxed">
              {t.description || "No description provided."}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-text-accent font-semibold text-sm uppercase tracking-wider">
              Notes
            </h2>
            <div className="bg-card-glass border border-primary/10 rounded-xl px-4 py-3">
              <p className="text-text-muted leading-relaxed">
                {t.notes || "No notes added."}
              </p>
            </div>
          </div>

          <div className="border-t border-primary/10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-card border border-secondary/20 rounded-xl px-4 py-4 flex items-center gap-4">
              <div className="bg-secondary/10 p-2 rounded-lg">
                <svg
                  className="w-5 h-5 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-text-subtle text-xs uppercase tracking-wider">
                  Start Date
                </p>
                <p className="text-text font-semibold">
                  {new Date(t.startDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="bg-card border border-primary/20 rounded-xl px-4 py-4 flex items-center gap-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <p className="text-text-subtle text-xs uppercase tracking-wider">
                  End Date
                </p>
                <p className="text-text font-semibold">
                  {new Date(t.endDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-primary/10" />

          <div className="flex gap-3 justify-end">
            <EditTask taskId={task.data.task._id} task={t} />
            <DeleteTask taskId={task.data.task._id} />
          </div>
        </div>
      </div>

      {parentTask && (
        <div className="mt-5 w-full max-w-3xl bg-card-modal border border-primary/20 rounded-2xl shadow-2xl overflow-hidden">
          <div className="py-6 px-8">
            <div className="flex flex-col gap-2">
              <h2 className="text-text-accent font-semibold text-sm uppercase tracking-wider">
                Parent Task
              </h2>
              <div className="leading-relaxed bg-card-glass py-3 px-5 rounded-lg flex justify-between">
                <p className="text-text font-bold text-2xl">
                  {parentTask.data.task.name || "No Parent Task."}
                </p>
                <Link
                  href={`/tasks/${parentTask.data.task._id}`}
                  className="flex items-center gap-2 text-text-muted hover:text-primary 
                  transition duration-200 text-sm font-semibold"
                >
                  Go To
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {taskSubTasksData.length > 0 ? (
        <div className="mt-5 w-full max-w-7xl bg-card-modal border border-primary/20 rounded-2xl shadow-2xl overflow-hidden">
          <div className="py-6 px-8">
            <div className="flex flex-col gap-2">
              <h2 className="text-text-accent font-semibold text-md uppercase tracking-wider">
                Sub Tasks
              </h2>
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center
               gap-5"
              >
                {taskSubTasksData.map((task: TaskType) => (
                  <TaskCard
                    completed={task.completed}
                    description={task.description}
                    key={task._id}
                    name={task.name}
                    taskId={task._id}
                    endDate={new Date(task.endDate).toLocaleDateString()}
                    progress={task.progress}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Task;
