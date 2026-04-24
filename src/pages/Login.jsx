import { useEffect } from "react";
import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ setIsSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      setSuccess("Login successful 🎉");
    } catch (error) {
      console.log(error.code);

      switch (error.code) {
        case "auth/user-not-found":
          setError("No account found with this email");
          break;
        case "auth/wrong-password":
          setError("Incorrect password");
          break;
        case "auth/invalid-email":
          setError("Invalid Email");
          break;
        case "auth/too-many-requests":
          setError("Too many attempts. Try again later.");
          break;
        default:
          setError("Something went wrong. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center gap-4 w-80">
        <h2 className="text-2xl font-bold">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          className="border p-2 rounded w-64"
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
          className="border p-2 rounded w-64"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400" ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
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
          onClick={() => setIsSignup(true)}
          className="text-sm text-blue-500 cursor-pointer"
        >
          Don't have an account? Sign up
        </p>
      </div>
    </div>
  );
}
