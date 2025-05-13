import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgetPass = () => {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = () => {
    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    axios
      .post(`${baseUrl}/api/auth/forget-password`, {
        email,
        password,
        confirmPassword,
      })
      .then((res) => {
        console.log(res);
        navigate("/login/otpVerification", { state: { email } });
      })
      .catch((err) => {
        console.error(err);
        setError(err?.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 p-6 md:p-8 rounded-xl shadow-lg dark:shadow-black/30 transition-all">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Forgot Password?
        </h2>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              New Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-medium text-center">{error}</p>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-transform duration-150 text-white font-semibold py-3 rounded-md shadow-sm"
          >
            Reset Password
          </button>
        </div>

        <p className="text-center text-sm mt-6">
          Don’t have an account?{" "}
          <span
            className="text-indigo-500 hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgetPass;
