import React, { useContext, useState, useEffect } from "react";
import { taskContext } from "../context/TaskContext";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import { signOut } from "firebase/auth";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

export default function TaskList({ user }) {
  const { job, setJob } = useContext(taskContext);

  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [filter, setFilter] = useState("all");

  const handleLogout = async () => {
    await signOut(auth);
  };

  const fetchTasks = async (user) => {
    const snapshot = await getDocs(collection(db, "users", user.uid, "tasks"));

    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return tasks;
  };

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      const tasksFromDb = await fetchTasks(user);
      setJob(tasksFromDb);
    };

    load();
  }, [user]);

  const deleteTask = (id) => {
    const updatedTask = job.filter((j) => j.id !== id);
    setJob(updatedTask);
  };

  const completeTaskBtn = (id) => {
    const updatedTasks = job.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          status: task.status === "pending" ? "completed" : "pending",
        };
      }
      return task;
    });
    setJob(updatedTasks);
  };

  const filteredTasks = job.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.status === "completed";
    if (filter === "pending") return task.status === "pending";
    return true;
  });

  const saveEdit = (id) => {
    const updatedTask = job.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          taskDescription: editValue,
        };
      }
      return task;
    });

    setJob(updatedTask);
    setEditId(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6 space-y-6">
        {/* 🔹 Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold">Task Manager</h1>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200"
          >
            Logout
          </button>
        </div>

        {/* 🔹 Task Form */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <TaskForm />
        </div>

        {/* 🔹 Filter */}
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Tasks</h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-2 rounded text-sm"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* 🔹 Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-base border-collapse">
            <thead className="bg-gray-100">
              <tr className="hover:bg-gray-50 transition">
                <th className="p-3 border-b text-left font-semibold">Task</th>
                <th className="p-3 border-b text-left font-semibold">Status</th>
                <th className="p-3 border-b text-center font-semibold">
                  Priority
                </th>
                <th className="p-3 border-b text-center font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-6 text-gray-400">
                    No tasks yet. Start by adding one 👇
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    editId={editId}
                    setEditId={setEditId}
                    editValue={editValue}
                    setEditValue={setEditValue}
                    deleteTask={deleteTask}
                    completeTaskBtn={completeTaskBtn}
                    saveEdit={saveEdit}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
