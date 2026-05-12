"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "../shared/Button";
import CustomDatePicker from "../ui/CustomDatePicker";
import { updateTask } from "@/app/services/task.service";
import { useRouter } from "next/navigation";
import { Task } from "@/app/types/tasks";

function EditModal({
  onClose,
  taskId,
  task,
}: {
  onClose: Dispatch<SetStateAction<boolean>>;
  taskId: string;
  task: Task;
}) {
  const [error, setError] = useState("");
  const [name, setName] = useState<string>(task.name);
  const [description, setDescritpion] = useState<string>(task.description);
  const [notes, setNotes] = useState<string>(task.notes);
  const [startDate, setStartDate] = useState<Date>(new Date(task.startDate));
  const [endDate, setEndDate] = useState<Date>(new Date(task.endDate));
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateTask(
        taskId,
        name,
        description,
        notes,
        startDate?.toISOString(),
        endDate?.toISOString(),
      );
      onClose(false);
      router.refresh();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.errors?.[0]?.msg || err?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose(false);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-100 bg-card-glass flex items-center justify-center"
      onClick={() => onClose(false)}
    >
      <div
        className="bg-card-elevated min-w-80 md:min-w-100 min-h-100 rounded-lg shadow-xl shadow-card-hover
      flex flex-col p-5 gap-10"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-full flex justify-between">
          <h4 className="text-xl text-primary font-semibold">Edit Task</h4>
          <span
            onClick={() => onClose(false)}
            className="text-danger text-2xl cursor-pointer"
          >
            ✗
          </span>
        </div>

        {error && <div>{error}</div>}

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Task Name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            className="bg-card-glass text-text placeholder:text-text-muted border border-text-muted rounded-lg py-1 pr-1 pl-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            placeholder="Description"
            name="description"
            value={description}
            onChange={(e) => setDescritpion(e.currentTarget.value)}
            className="bg-card-glass text-text placeholder:text-text-muted border border-text-muted rounded-lg py-1 pr-1 pl-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            name="note"
            placeholder="Note"
            value={notes}
            onChange={(e) => setNotes(e.currentTarget.value)}
            className="bg-card-glass text-text placeholder:text-text-muted border border-text-muted rounded-lg py-1 pr-1 pl-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <div>
            <span className="text-text-muted text-sm">
              start date {startDate.toLocaleDateString()}
            </span>
            <CustomDatePicker
              dateFor="Start"
              onDateChange={(date) => {
                setStartDate(date);
              }}
            />
          </div>

          <div>
            <span className="text-text-muted text-sm">
              end date {endDate.toLocaleDateString()}
            </span>
            <CustomDatePicker
              dateFor="End"
              onDateChange={(date) => {
                setEndDate(date);
              }}
            />
          </div>

          <Button
            className="rounded-lg py-2 font-semibold hover:opacity-90 transition"
            theme="primary"
            type="submit"
          >
            Add
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
