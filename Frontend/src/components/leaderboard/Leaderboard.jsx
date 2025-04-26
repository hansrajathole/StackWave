// Leaderboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Award,
  Medal,
  Star,
  Users,
  TrendingUp,
} from "lucide-react";

export default function Leaderboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/users/leaderboard`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const Badge = ({ type }) => {
    const colorMap = {
      gold: ["text-yellow-500", "bg-yellow-500/10"],
      silver: ["text-gray-400", "bg-gray-400/10"],
      bronze: ["text-amber-600", "bg-amber-600/10"],
    };
    const [textColor, bgColor] = colorMap[type] || ["text-slate-400", "bg-slate-400/10"];
    return (
      <div className={`flex items-center mr-2 px-2 py-1 rounded-full ${bgColor}`}>
        <Medal className={textColor} size={14} />
      </div>
    );
  };

  const RankMarker = ({ rank }) => {
    const styles = {
      1: "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white",
      2: "bg-gradient-to-br from-gray-300 to-gray-500 text-white",
      3: "bg-gradient-to-br from-amber-600 to-amber-800 text-white",
    };
    const style = styles[rank] || "bg-slate-700 text-white dark:text-slate-300";
    return (
      <div className={`flex items-center justify-center h-8 w-8 rounded-full ${style} shadow`}>
        {rank}
      </div>
    );
  };

  return (
    <div className="w-full rounded-xl shadow-xl overflow-hidden border dark:border-slate-700 border-gray-200 p-4 bg-white text-gray-800 dark:bg-slate-900 dark:text-white transition-colors duration-300">
      {/* Header */}
      <div className="p-6 mb-4 border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 rounded-md">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold flex items-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 dark:from-indigo-300 dark:to-purple-300">
            <Award className="mr-2 text-yellow-500" size={26} />
            Reputation Leaderboard
          </h1>
          <div className="flex items-center bg-gray-100 dark:bg-slate-700 rounded px-3 py-1 text-sm border border-gray-200 dark:border-slate-600">
            <Users size={16} className="mr-1 text-indigo-500" />
            <span className="font-medium">{users.length} Users</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left - User List */}
        <div className="w-full md:w-1/2">
          {users.map((user, index) => (
            <div
              key={user._id}
              className="flex items-center justify-between p-4 mb-2 rounded-md bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition"
            >
              <div className="flex items-center">
                <RankMarker rank={index + 1} />
                <div
                  onClick={() => navigate(`/profile/${user._id}`)}
                  className="ml-3 cursor-pointer"
                >
                  <img
                    src={user.avatar}
                    className="h-10 w-10 rounded-full border border-gray-300 dark:border-slate-600 object-cover"
                    alt={user.username}
                  />
                </div>
                <div className="ml-3">
                  <div className="font-semibold">{user.username}</div>
                  <div className="text-sm text-gray-500 dark:text-slate-400 flex items-center">
                    @{user.username}
                    <TrendingUp className="ml-1 text-green-500" size={12} />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star className="text-yellow-500" size={18} />
                <span className="font-bold text-indigo-600 dark:text-indigo-300">
                  {user.reputation.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right - Badges */}
        <div className="w-full md:w-1/2">
          <div className="mb-2 p-3 text-center text-sm bg-gray-100 dark:bg-slate-800 rounded-md border dark:border-slate-700">
            <div className="flex justify-center gap-4 mb-2">
              <div className="flex items-center text-yellow-500">
                <Medal size={16} className="mr-1" />
                Gold
              </div>
              <div className="flex items-center text-gray-400">
                <Medal size={16} className="mr-1" />
                Silver
              </div>
              <div className="flex items-center text-amber-600">
                <Medal size={16} className="mr-1" />
                Bronze
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Badges reflect contributions and achievements.
            </p>
          </div>

          {users.map((user, index) => (
            <div
              key={user._id + "_badge"}
              className="flex items-center justify-between p-3 rounded-md mb-2 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition"
            >
              <div className="flex items-center">
                <RankMarker rank={index + 1} />
                <div className="ml-3">
                  <div className="text-sm font-medium">{user.username}</div>
                  <div className="text-xs text-gray-500 dark:text-slate-400">@{user.username}</div>
                </div>
              </div>
              <div className="flex gap-1 flex-wrap">
                {user.badges?.map((badge, i) => (
                  <Badge key={i} type={badge} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
