import Link from "next/link";

type Props = {
  key: string;
  name: string;
  description: string;
  endDate?: string;
  index?: number;
  completed: boolean;
  progress?: number;
  taskId: string;
};

function TaskCard({
  name,
  description,
  endDate,
  completed,
  progress,
  taskId,
}: Props) {
  const status = completed === true || progress === 100 ? "done" : "not done";

  return (
    <div
      className="bg-surface p-6 rounded-lg transition-all duration-300 
      hover:bg-surface-hover hover:shadow-xl 
      cursor-pointer relative 
      flex flex-col justify-around items-center gap-3 min-w-90 max-w-100 min-h-50 overflow-hidden"
    >
      <span
        className={`text-xs absolute top-4 left-4 px-3 py-1 rounded-full 
        ${
          status === "done"
            ? "bg-success/20 text-success"
            : "bg-danger/20 text-danger"
        }`}
      >
        {status === "done" ? "Done" : "Not Done"}
      </span>

      {endDate && (
        <span
          className="absolute top-4 right-4 text-xs text-text-muted text-center bg-surface-hover
         rounded-full px-3 py-1"
        >
          {endDate}
        </span>
      )}

      <div>
        <h2 className="text-lg font-semibold text-center mt-6">{name}</h2>
        <p className="text-text-muted text-sm text-center line-clamp-3">
          {description}
        </p>
      </div>

      <div className="flex justify-end">
        <Link
          href={`/tasks/${taskId}`}
          className="inline-flex items-center gap-2 rounded-xl
               px-4 py-2
               bg-linear-to-r from-primary/25 to-secondary/20
               text-text-emphasis border border-primary/20
               hover:border-primary/40 hover:shadow-lg hover:shadow-primary/20
               transition duration-200"
        >
          <span className="text-sm font-semibold">View Task</span>
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default TaskCard;
