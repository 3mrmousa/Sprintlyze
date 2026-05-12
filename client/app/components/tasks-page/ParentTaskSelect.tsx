"use client";
import { useState } from "react";
import { Task } from "@/app/types/tasks";

function ParentTaskSelect({
  tasks,
  value,
  onChange,
}: {
  tasks: Task[];
  value: string;
  onChange: (id: string) => void;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selected = tasks.find((t) => t._id === value);

  return (
    <div className="relative w-full">
      {/* Trigger */}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-card-glass text-text 
        border border-text-muted rounded-lg py-2 px-3
        focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
      >
        <span className={selected ? "text-text" : "text-text-muted"}>
          {selected ? selected.name : "None"}
        </span>
        {/* Arrow icon */}
        <svg
          className={`w-4 h-4 text-text-muted transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div
          className="absolute z-50 mt-1 w-full bg-card-modal border border-text-muted 
          rounded-lg shadow-lg overflow-y-auto max-h-30"
        >
          <div
            onClick={() => {
              onChange("");
              setIsOpen(false);
            }}
            className={`px-3 py-2 cursor-pointer text-text-muted hover:bg-primary/10 
            hover:text-primary transition duration-150
            ${value === "" ? "bg-primary/10 text-primary" : ""}`}
          >
            None (Top-level task)
          </div>
          {tasks.length > 0 && (
            <div className="border-t border-text-muted/20" />
          )}
          {tasks.map((task) => (
            <div
              key={task._id}
              onClick={() => {
                onChange(task._id);
                setIsOpen(false);
              }}
              className={`px-3 py-2 cursor-pointer text-text-muted hover:bg-primary/10 
            hover:text-primary transition duration-150
            ${value === task._id ? "bg-primary/10 text-primary" : ""}`}
            >
              {task.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ParentTaskSelect;
