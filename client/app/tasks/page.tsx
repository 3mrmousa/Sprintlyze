"use client";

import Link from "next/link";
import TasksAddAndManage from "../components/tasks-page/TasksAddAndManage";
import {
  getCompletedTasks,
  getNotCompletedTasks,
  getTasks,
} from "../services/task.service";
import ShowTasks from "../components/tasks-page/ShowTasks";
import { getMe } from "../services/auth.service";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Tasks() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const filter = searchParams.get("filter") || "all";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tasks, setTasks] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPage = async () => {
      try {
        const userResponse = await getMe();

        if (!userResponse) {
          router.push("/login");
          return;
        }

        setUser(userResponse.data.user);

        let tasksResponse;

        if (filter === "done") {
          tasksResponse = await getCompletedTasks();
        } else if (filter === "notdone") {
          tasksResponse = await getNotCompletedTasks();
        } else {
          tasksResponse = await getTasks();
        }

        setTasks(tasksResponse);
      } catch (error) {
        console.error("Failed to load tasks page:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    loadPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-text">
        Loading tasks...
      </div>
    );
  }

  if (!user || !tasks) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center text-text pt-30 gap-2">
      <div className="bg-surface p-8 rounded-lg shadow-lg flex flex-col items-center gap-4 w-full max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold">
          Welcome {user.firstName} {user.lastName}
        </h1>

        <TasksAddAndManage />
      </div>

      <div className="bg-card-glass my-5 w-2/3 px-3 py-3 rounded-xl flex justify-between">
        <p className="text-text-muted">Filter</p>

        <div className="flex gap-2">
          <Link
            href="/tasks?filter=all"
            className={`bg-secondary/20 hover:bg-secondary-glow shadow-secondary text-secondary 
              hover:text-black hover:font-semibold text-sm hover:scale-105 duration-300 
              shadow-2xl py-1 px-3 rounded-xl cursor-pointer
              ${filter === "all" ? "ring-2 ring-secondary" : ""}`}
          >
            All
          </Link>

          <Link
            href="/tasks?filter=done"
            className={`bg-success/20 hover:bg-success-glow shadow-success text-success 
              hover:text-black hover:font-semibold text-sm hover:scale-105 duration-300 
              shadow-2xl py-1 px-3 rounded-xl cursor-pointer
              ${filter === "done" ? "ring-2 ring-success" : ""}`}
          >
            Done
          </Link>

          <Link
            href="/tasks?filter=notdone"
            className={`bg-danger/20 hover:bg-danger-glow shadow-danger text-danger 
              hover:text-black hover:font-semibold text-sm hover:scale-105 duration-300 
              shadow-2xl py-1 px-3 rounded-xl cursor-pointer
              ${filter === "notdone" ? "ring-2 ring-danger" : ""}`}
          >
            Not Done
          </Link>
        </div>
      </div>

      <div className="tasks grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <ShowTasks tasks={tasks} />
      </div>
    </div>
  );
}

export default Tasks;
