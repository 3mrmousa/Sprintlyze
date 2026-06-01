import mongoose, { Types } from "mongoose";

interface ITask {
  name: string;
  description?: string;
  completed: boolean;
  startDate?: Date;
  endDate?: Date;
  notes?: string;
  user: Types.ObjectId;
  parentTaskId?: Types.ObjectId | null;
  progress: number;
}

const taskSchema = new mongoose.Schema<ITask>(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      default: "",
    },
    notes: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    completed: { type: Boolean, default: false },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
    },
    parentTaskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      default: null,
      index: true,
      immutable: true,
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true },
);

export const TaskModel = mongoose.model("Task", taskSchema);
