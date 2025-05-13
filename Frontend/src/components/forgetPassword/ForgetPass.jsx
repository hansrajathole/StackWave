import React from "react";
import { useNavigate } from "react-router-dom";
const ForgetPass = () => {

    const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-200 p-6 md:p-8 rounded-xl shadow-lg dark:shadow-black/30 transition-all">
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
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-zinc-700 px-4 py-3 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
            />
          </div>

          <button
            type="button"
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-transform duration-150 text-white font-semibold py-3 rounded-md shadow-sm"
          >
            Send Reset Link
          </button>
        </div>

        <p className="text-center text-sm mt-6">
          Don’t have an account?{" "}
          <span className="text-indigo-500 hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Signup Now
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgetPass;
