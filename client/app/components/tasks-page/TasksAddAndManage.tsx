"use client";

import { useState } from "react";
import Button from "../shared/Button";
import AddTaskModal from "./AddTaskModal";

function TasksAddAndManage() {
  const [addModal, setAddModal] = useState(false);

  return (
    <>
      <div className="flex gap-2 mt-3">
        <Button theme="primary" className="font-semibold" onClick={() => setAddModal((prev) => !prev)}>
          Add Task
        </Button>
      </div>
      {addModal && <AddTaskModal setAddModal={setAddModal} />}
    </>
  );
}

export default TasksAddAndManage;
