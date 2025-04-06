import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex bg-slate-950 text-slate-100 min-h-screen">
      {/* Sidebar/Navbar */}
      <div className="w-[20%]">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="w-full ">
        {/* Hero Section */}
        <section className="py-20 px-6 text-center bg-slate-900 shadow-inner">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Welcome to StackWave
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-xl mx-auto">
            Collaborate. Learn. Grow. A modern place for developers to share
            knowledge and build reputation.
          </p>
          <Button
            onClick={() => navigate("/login")}
            className="mt-6 bg-blue-600 hover:bg-blue-700"
          >
            Get Started
          </Button>
        </section>

        {/* Feature Cards */}
        <section className="py-16 px-6 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "Ask Questions",
              desc: "Post technical queries and get expert answers.",
            },
            {
              title: "Join Rooms",
              desc: "Collaborate in real-time with global developers.",
            },
            {
              title: "Track Progress",
              desc: "See your growth through reputation and badges.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-slate-800 text-slate-200 rounded-xl p-6 shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-slate-300">{feature.desc}</p>
            </div>
          ))}
        </section>

        {/* Leaderboard Section */}
        <section className="px-6 pb-20 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">
            Top Contributors
          </h2>
          <ul className="bg-slate-800 rounded-xl divide-y divide-slate-700">
            {[
              { name: "Alice Johnson", points: 3200 },
              { name: "Bob Smith", points: 2900 },
              { name: "Charlie Brown", points: 2750 },
            ].map((user, idx) => (
              <li key={idx} className="p-4 flex justify-between">
                <span className="text-slate-100 font-medium">{user.name}</span>
                <span className="text-blue-500 font-semibold">
                  {user.points} pts
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Home;
