"use client";

import { useState } from "react";
import EditModal from "./EditModal";
import { Task } from "@/app/types/tasks";

function EditTask({ taskId, task }: { taskId: string, task: Task }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => {
          setIsOpen((prv) => !prv);
        }}
        className="px-4 py-2 rounded-xl border border-primary/30 text-primary 
              hover:bg-primary/10 transition duration-200 text-sm font-semibold
              cursor-pointer"
      >
        Edit Task
      </button>

      {isOpen && <EditModal onClose={setIsOpen} taskId={taskId} task={task}/>}
    </>
  );
}

export default EditTask;
