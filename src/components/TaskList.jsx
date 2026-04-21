import React, { useContext, useState } from "react";
import { taskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

export default function TaskList() {
  const { job, setJob } = useContext(taskContext);

  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [filter, setFilter] = useState("all");

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
    <div className="min-h-screen flex items-start sm:items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 sm:p-6">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Task Manager
        </h1>
        <TaskForm />

        {/* Table */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded mb-4"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
        <div className="overflow-x-auto">
          <table className="w-full text-base sm:text-lg border-collapse">
            <thead className="bg-gray-100">
              <tr>
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
              {filteredTasks.map((task) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
