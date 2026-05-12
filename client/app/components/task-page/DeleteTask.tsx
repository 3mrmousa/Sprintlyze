"use client";

import { deleteTask } from "@/app/services/task.service";
import { useRouter } from "next/navigation";

function DeleteTask({ taskId }: { taskId: string }) {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        await deleteTask(taskId);
        router.push("/tasks");
        router.refresh();
      }}
      className="px-4 py-2 rounded-xl border border-danger/30 text-danger 
              hover:bg-danger/10 transition duration-200 text-sm font-semibold cursor-pointer"
    >
      Delete Task
    </button>
  );
}

export default DeleteTask;
