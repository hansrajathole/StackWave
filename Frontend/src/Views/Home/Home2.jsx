import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useSelector } from "react-redux";
import Sidebar from "../../components/Navbar/Sidebar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home2 = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  
  const navigate = useNavigate();
  const [userQuestions, setUserQuestions] = useState([]);

  useEffect(() => {
    const fetchUserQuestions = async () => {
      if (user) {
        try {
          const res = await axios.get(`/api/questions?user=${user._id}`);
          setUserQuestions(res.data);
        } catch (error) {
          console.error("Failed to fetch questions:", error);
        }
      }
    };

    fetchUserQuestions();
  }, [user]);

  return (
    <div className="flex w-full">
      <div className="">
        <Navbar />
      </div>

      <div className="min-h-full w-full bg-gray-900 dark:bg-gray-950 text-gray-200 flex">
        <div className=" w-64 max-sm:opacity-0 max-sm:invisible max-sm:w-0 transition-all duration-300 ease-in-out">
          <Sidebar />
        </div>
        <div className="w-[90%] max-sm:w-full">
          <section className="bg-white dark:bg-gray-900 py-20 px-6 text-center shadow">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Welcome to StackWave
            </h1>
            {user ? (
              <>
                <p className="mt-2 text-4xl text-blue-600 dark:text-blue-400 font-semibold">
                  {user.username}!
                </p>
                <div className="mt-4 flex justify-center gap-4">
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <p className="text-gray-700 dark:text-white font-semibold">Reputation</p>
                    <p className="text-xl text-blue-500 font-bold">{user.reputation || 0}</p>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <p className="text-gray-700 dark:text-white font-semibold">Badges</p>
                    <p className="text-xl text-yellow-400 font-bold">🏅 {user.badges?.length || 0}</p>
                  </div>
                </div>
              </>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                className="mt-6 bg-blue-600 hover:bg-blue-700"
              >
                Get Started
              </Button>
            )}
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
              Collaborate. Learn. Grow. A modern place for developers to share
              knowledge and build reputation.
            </p>
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
                className="bg-white dark:bg-gray-800 dark:text-gray-200 shadow rounded-lg p-6 hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {feature.desc}
                </p>
              </div>
            ))}
          </section>

          {/* User's Questions */}
          {/* {user && userQuestions.length > 0 && (
            <section className="px-6 pb-20 max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Your Questions
              </h2>
              <ul className="bg-white dark:bg-gray-800 shadow rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
                {userQuestions.map((q) => (
                  <li key={q._id} className="p-4">
                    <h3 className="font-semibold text-blue-500">{q.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{q.body}</p>
                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>Votes: {q.votes}</span>
                      <span>Tags: {q.tags.join(", ")}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )} */}

          {/* Leaderboard Preview */}
          <section className="px-6 pb-20 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Top Contributors
            </h2>
            <ul className="bg-white dark:bg-gray-800 shadow rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
              {[
                { name: "Alice Johnson", points: 3200 },
                { name: "Bob Smith", points: 2900 },
                { name: "Charlie Brown", points: 2750 },
              ].map((user, idx) => (
                <li key={idx} className="p-4 flex justify-between">
                  <span className="font-medium text-gray-700 dark:text-gray-100">
                    {user.name}
                  </span>
                  <span className="text-blue-600 font-semibold">
                    {user.points} pts
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home2;