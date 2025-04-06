import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAuthUser } from "../../Redux/AuthSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/auth/signin", { email, password })
      .then((res) => {
        dispatch(setAuthUser(res.data.user));
        localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="bg-gray-950 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 rounded-xl bg-gray-900 shadow-xl text-white">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">StackWave</h1>
          <p className="text-gray-400 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-1 text-sm">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-gray-400 hover:text-white text-lg"
              >
                {showPassword ? "👁️" : "🙈"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="form-checkbox bg-gray-800 border-gray-600 text-blue-500"
              />
              Remember me
            </label>
            <a href="#" className="text-blue-400 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded-lg"
          >
            Sign In
          </button>

          <div className="flex items-center justify-between text-white opacity-50 mt-4">
            <div className="w-[45%] h-px bg-white" />
            <span className="text-sm">OR</span>
            <div className="w-[45%] h-px bg-white" />
          </div>

          <button className="w-full flex items-center justify-center gap-2 mt-2 bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition">
            <svg
              width="20"
              height="20"
              viewBox="0 0 512 512"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="#34A853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
              <path fill="#4285F4" d="M386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
              <path fill="#FBBC04" d="M90 341a208 200 0 010-171l63 49q-12 37 0 73" />
              <path fill="#EA4335" d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
            </svg>
            <span>Continue with Google</span>
          </button>

          <p className="text-sm text-gray-400 text-center mt-4">
            Don’t have an account yet?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-500 hover:underline"
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
