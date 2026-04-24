import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup({ setIsSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // ⏱ Auto-clear messages
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const handleSignup = async () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password.trim());

      setSuccess("Account created successfully 🎉");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("Email already in use");
          break;
        case "auth/invalid-email":
          setError("Invalid email format");
          break;
        case "auth/weak-password":
          setError("Password should be at least 6 characters");
          break;
        default:
          setError("Something went wrong. Try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center gap-4 w-80">
        <h2 className="text-2xl font-bold">Create Account</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
            setSuccess("");
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
            setSuccess("");
          }}
        />

        {/* 🔘 Button with spinner */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className={`flex items-center justify-center gap-2 w-full py-2 rounded text-white transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Creating...
            </>
          ) : (
            "Sign Up"
          )}
        </button>

        {/* 💬 Messages */}
        {error && (
          <p className="text-red-500 text-sm transition-opacity duration-300">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-500 text-sm transition-opacity duration-300">
            {success}
          </p>
        )}

        <p
          onClick={() => setIsSignup(false)}
          className="text-sm text-blue-500 cursor-pointer"
        >
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}
