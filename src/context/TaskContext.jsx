import { createContext, useState, useEffect } from "react";
import mockTasks from "../data/tasks";

export const taskContext = createContext();
export const TaskProvider = ({ children }) => {
  const [job, setJob] = useState(() => {
    const stored = localStorage.getItem("job");
    return stored ? JSON.parse(stored) : mockTasks;
  });
  useEffect(() => {
    localStorage.setItem("job", JSON.stringify(job));
  }, [job]);
  return (
    <taskContext.Provider value={{ job, setJob }}>
      {children}
    </taskContext.Provider>
  );
};


   



 