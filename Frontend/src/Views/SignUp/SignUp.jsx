import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/api/auth/signup", { username, email, password })
      .then((res) => {
        console.log(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="bg-gray-950 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-white text-center mb-6">Sign up to your account</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-1">Your email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500"
              placeholder="name@gmail.com"
              required
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-white mb-1">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ex: alex"
              className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-white"
              >
                {showPassword ? "👁️" : "🙈"}
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input
              id="terms"
              type="checkbox"
              required
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
            />
            <label htmlFor="terms" className="text-sm text-gray-300">Accept terms and conditions</label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
          >
            Sign up
          </button>

          <div className="flex items-center justify-center space-x-2 mt-4">
            <div className="w-1/4 h-px bg-gray-600" />
            <span className="text-gray-400">OR</span>
            <div className="w-1/4 h-px bg-gray-600" />
          </div>

          <button className="w-full flex items-center justify-center bg-white text-black py-2 rounded-lg mt-2">
            <svg
              aria-label="Google logo"
              width="19"
              height="19"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="mr-2"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
                <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
                <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
              </g>
            </svg>
            <span className="font-semibold">Continue with Google</span>
          </button>

          <p className="text-sm text-center text-gray-400 mt-4">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-500 hover:underline"
            >
              Sign In
            </button>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
