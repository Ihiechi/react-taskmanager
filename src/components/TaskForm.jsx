import React, { useContext, useState } from "react";
import { taskContext } from "../context/TaskContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export default function TaskForm() {
  const { job, setJob } = useContext(taskContext);
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState("low");

  const addNewTask = async () => {
    if (!inputValue.trim()) return;
    const newTask = {
      id: Date.now(),
      taskDescription: inputValue,
      status: "pending",
      priority: priority,
    };
    await addDoc(collection(db, "tasks"), newTask);
    setJob([...job, newTask]);
    setInputValue("");
  };

  return (
    //Input
    <div className="flex flex-col sm:flex-row gap-3 mb-6 ">
      <input
        type="text"
        className="border p-3 rounded w-full sm:flex-1"
        placeholder="Enter task..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className="flex flex-col">
        <label className="text-sm font-bold text-gray-600">Priority</label>
        <select
          onChange={(e) => setPriority(e.target.value)}
          value={priority}
          className="border p-2 rounded w-full sm:w-40"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <button
        onClick={addNewTask}
        className="bg-blue-500 hover:bg-blue-600 py-3 sm:py-2 px-4 text-white rounded w-full sm:w-auto"
      >
        Add Task
      </button>
    </div>
  );
}
