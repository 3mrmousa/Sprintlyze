"use client";

import { updateTaskCompletion } from "@/app/services/task.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

function TaskCompletionButton({
  taskId,
  taskCompletion,
}: {
  taskId: string;
  taskCompletion: boolean;
}) {
  const [isCompleted, setIsCompleted] = useState<boolean>(taskCompletion);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleOnClick = async () => {
    if (loading) return;

    const newValue = !isCompleted;

    setIsCompleted(newValue);
    setLoading(true);

    try {
      await updateTaskCompletion(taskId, newValue);
      router.refresh();
    } catch {
      setIsCompleted(!newValue);
    } finally {
      setLoading(false);
    }
  };

  return (
    <span
      onClick={handleOnClick}
      className={`shrink-0 px-3 py-1 rounded-full text-sm font-semibold border cursor-pointer
              ${
                isCompleted
                  ? "bg-success/10 text-success hover:text-success-glow border-success/30"
                  : "bg-danger/10 text-danger hover:text-danger-glow border-danger/30"
              }`}
    >
      {isCompleted ? "✓ Completed" : "✗ Not Completed"}
    </span>
  );
}

export default TaskCompletionButton;
