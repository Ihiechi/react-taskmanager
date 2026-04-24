import "./App.css";
import TaskList from "./components/TaskList";
import { TaskProvider } from "./context/TaskContext";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔄 Loading state (important UX)
  if (loading) return <p>Loading...</p>;

  return (
    <TaskProvider>
      {user ? (
        <TaskList user={user} />
      ) : isSignup ? (
        <Signup setIsSignup={setIsSignup} />
      ) : (
        <Login setIsSignup={setIsSignup} />
      )}
    </TaskProvider>
  );
}

export default App;
