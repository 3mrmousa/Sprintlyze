"use client";

import { useEffect, useState } from "react";
import CustomDatePicker from "../ui/CustomDatePicker";
import Button from "../shared/Button";
import { getTasks, postTask } from "@/app/services/task.service";
import { useRouter } from "next/navigation";
import { Task } from "@/app/types/tasks";
import ParentTaskSelect from "./ParentTaskSelect";

function AddTaskModal({
  setAddModal,
}: {
  setAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [error, setError] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [parentTaskId, setParentTaskId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data.data.tasks);
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAddModal(false);
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [setAddModal]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    const form = e.currentTarget as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const description = (form.elements.namedItem("desc") as HTMLTextAreaElement)
      .value;
    const notes = (form.elements.namedItem("note") as HTMLInputElement).value;

    try {
      await postTask(
        name,
        description,
        notes,
        startDate.toISOString(),
        endDate.toISOString(),
        parentTaskId === "" ? null : parentTaskId,
      );
      setAddModal(false);
      router.refresh();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.errors?.[0]?.msg || err?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-card-glass"
      onClick={() => {
        setAddModal(false);
      }}
    >
      <div
        className="relative bg-card-modal 
    min-w-80 md:min-w-100 lg:min-w-120 rounded-xl flex flex-col items-center p-5"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-full flex justify-between mb-3">
          <h4 className="text-xl text-primary font-semibold">Add Task</h4>
          <span
            onClick={() => setAddModal(false)}
            className="text-danger text-2xl cursor-pointer"
          >
            ✗
          </span>
        </div>
        <form onSubmit={handleSubmit} className="w-2/3 flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Task Name"
            className="bg-card-glass text-text placeholder:text-text-muted border border-text-muted rounded-lg py-1 pr-1 pl-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            placeholder="Description"
            name="description"
            className="bg-card-glass text-text placeholder:text-text-muted border border-text-muted rounded-lg py-1 pr-1 pl-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            name="note"
            placeholder="Note"
            className="bg-card-glass text-text placeholder:text-text-muted border border-text-muted rounded-lg py-1 pr-1 pl-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <CustomDatePicker
            dateFor="Start"
            onDateChange={(date) => {
              setStartDate(date);
            }}
          />

          <CustomDatePicker
            dateFor="End"
            onDateChange={(date) => {
              setEndDate(date);
            }}
          />

          <ParentTaskSelect
            tasks={tasks}
            value={parentTaskId}
            onChange={(id) => setParentTaskId(id)}
          />

          <Button
            className="rounded-lg py-2 font-semibold hover:opacity-90 transition"
            theme="primary"
            type="submit"
          >
            Add
          </Button>
        </form>
        <p className="text-danger mt-3">{error}</p>
      </div>
    </div>
  );
}

export default AddTaskModal;
