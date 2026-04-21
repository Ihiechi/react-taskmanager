import React from "react";

export default function TaskItem({
  task,
  editId,
  setEditId,
  editValue,
  setEditValue,
  deleteTask,
  completeTaskBtn,
  saveEdit,
}) {
  return (
    <tr className="border-b hover:bg-gray-50 transition">
      {/* Task + Edit */}
      <td className="p-3 sm:p-4 align-middle">
        {task.id === editId ? (
          <div className="flex items-center gap-2">
            <input
              className="border p-2 rounded w-full"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />

            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded shrink-0"
              onClick={() => saveEdit(task.id)}
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-3">
            <span
              className={`flex-1 ${
                task.status === "completed" ? "line-through text-gray-400" : ""
              }`}
            >
              {task.taskDescription.charAt(0).toUpperCase() +
                task.taskDescription.slice(1).toLowerCase()}
            </span>

            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded shrink-0"
              onClick={() => {
                setEditId(task.id);
                setEditValue(task.taskDescription);
              }}
            >
              Edit
            </button>
          </div>
        )}
      </td>

      {/* Status */}
      <td className="p-3 sm:p-4 align-middle">
        <span
          className={
            task.status === "completed"
              ? "text-green-600 font-semibold"
              : "text-yellow-600 font-semibold"
          }
        >
          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
      </td>
      <td className="p-3 sm:p-4 align-middle rounded">
        <span
          className={
            task.priority === "high"
              ? "text-red-500 font-semibold"
              : task.priority === "medium"
                ? "text-yellow-500 font-semibold"
                : "text-blue-500"
          }
        >
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
      </td>

      {/* Actions */}
      <td className="p-3 sm:p-4 align-middle">
        <div className="flex flex-wrap gap-2 sm:justify-center">
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm sm:text-base"
            onClick={() => completeTaskBtn(task.id)}
          >
            Toggle
          </button>

          <button
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm sm:text-base"
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
