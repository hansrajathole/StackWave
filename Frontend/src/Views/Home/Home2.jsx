import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useSelector } from "react-redux";
const Home2 = () => {
  
  const user = useSelector((state) => state.auth.user); 

  return (
    <div className="flex">
      <div className="w-[20%] ">
        <Navbar />
      </div>
      <div className="min-h-full w-full bg-gray-900 dark:bg-gray-950 text-gray-200">
       
        <section className="bg-white dark:bg-gray-900 py-20 px-6 text-center shadow">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Welcome to StackWave
          </h1>
          {user && (
            <p className="mt-2 text-4xl text-blue-600 dark:text-blue-400 font-semibold">
               {user.username}!
            </p>
          )}
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Collaborate. Learn. Grow. A modern place for developers to share
            knowledge and build reputation.
          </p>
          
        </section>

        {/* Feature Cards */}
        <section className="py-16 px-6 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[ 
            { title: "Ask Questions", desc: "Post technical queries and get expert answers." },
            { title: "Join Rooms", desc: "Collaborate in real-time with global developers." },
            { title: "Track Progress", desc: "See your growth through reputation and badges." },
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
  );
};

export default Home2;