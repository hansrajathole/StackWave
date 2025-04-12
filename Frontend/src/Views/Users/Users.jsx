import React from "react";
import { useState } from "react";

const Users = () => {
    const users = [
        { name: "Alice Johnson", profilePicture: "https://i.pravatar.cc/150?img=1", reputation: 1200, location: "New York, USA" },
        { name: "Bob Smith", profilePicture: "https://i.pravatar.cc/150?img=2", reputation: 850, location: "Los Angeles, USA" },
        { name: "Charlie Brown", profilePicture: "https://i.pravatar.cc/150?img=3", reputation: 3200, location: "Toronto, Canada" },
        { name: "David Lee", profilePicture: "https://i.pravatar.cc/150?img=4", reputation: 2700, location: "London, UK" },
        { name: "Emma Wilson", profilePicture: "https://i.pravatar.cc/150?img=5", reputation: 1500, location: "Sydney, Australia" },
        { name: "Frank Martin", profilePicture: "https://i.pravatar.cc/150?img=6", reputation: 1950, location: "Berlin, Germany" },
        { name: "Grace Lewis", profilePicture: "https://i.pravatar.cc/150?img=7", reputation: 1000, location: "Paris, France" },
        { name: "Henry Baker", profilePicture: "https://i.pravatar.cc/150?img=8", reputation: 2400, location: "Madrid, Spain" },
        { name: "Ivy Roberts", profilePicture: "https://i.pravatar.cc/150?img=9", reputation: 1100, location: "Mumbai, India" },
        { name: "Jack Thompson", profilePicture: "https://i.pravatar.cc/150?img=10", reputation: 3300, location: "Tokyo, Japan" },
        { name: "Katie Murphy", profilePicture: "https://i.pravatar.cc/150?img=11", reputation: 900, location: "Dubai, UAE" },
        { name: "Liam White", profilePicture: "https://i.pravatar.cc/150?img=12", reputation: 2900, location: "Singapore" },
        { name: "Mia Garcia", profilePicture: "https://i.pravatar.cc/150?img=13", reputation: 1350, location: "Hong Kong" },
        { name: "Noah Harris", profilePicture: "https://i.pravatar.cc/150?img=14", reputation: 2250, location: "Seoul, South Korea" },
        { name: "Olivia Adams", profilePicture: "https://i.pravatar.cc/150?img=15", reputation: 1750, location: "Cape Town, South Africa" },
        { name: "Paul Turner", profilePicture: "https://i.pravatar.cc/150?img=16", reputation: 1450, location: "São Paulo, Brazil" },
        { name: "Quinn Foster", profilePicture: "https://i.pravatar.cc/150?img=17", reputation: 3100, location: "Amsterdam, Netherlands" },
        { name: "Ryan Cooper", profilePicture: "https://i.pravatar.cc/150?img=18", reputation: 2600, location: "Stockholm, Sweden" },
        { name: "Sophia Bell", profilePicture: "https://i.pravatar.cc/150?img=19", reputation: 1900, location: "Vienna, Austria" },
        { name: "Thomas Evans", profilePicture: "https://i.pravatar.cc/150?img=20", reputation: 2000, location: "Zurich, Switzerland" },
        { name: "Uma Reed", profilePicture: "https://i.pravatar.cc/150?img=21", reputation: 1100, location: "Oslo, Norway" },
        { name: "Victor Hughes", profilePicture: "https://i.pravatar.cc/150?img=22", reputation: 2800, location: "Helsinki, Finland" },
        { name: "Wendy Scott", profilePicture: "https://i.pravatar.cc/150?img=23", reputation: 1700, location: "Brussels, Belgium" },
        { name: "Xavier Perez", profilePicture: "https://i.pravatar.cc/150?img=24", reputation: 2300, location: "Lisbon, Portugal" },
        { name: "Yasmine Clark", profilePicture: "https://i.pravatar.cc/150?img=25", reputation: 2200, location: "Athens, Greece" },
        { name: "Zane Hall", profilePicture: "https://i.pravatar.cc/150?img=26", reputation: 3000, location: "Copenhagen, Denmark" },
        { name: "Amber Diaz", profilePicture: "https://i.pravatar.cc/150?img=27", reputation: 1600, location: "Prague, Czech Republic" },
        { name: "Brandon Young", profilePicture: "https://i.pravatar.cc/150?img=28", reputation: 2900, location: "Warsaw, Poland" },
        { name: "Catherine Moore", profilePicture: "https://i.pravatar.cc/150?img=29", reputation: 1800, location: "Budapest, Hungary" },
        { name: "Daniel Parker", profilePicture: "https://i.pravatar.cc/150?img=30", reputation: 2700, location: "Dublin, Ireland" },
        { name: "Eliza Ross", profilePicture: "https://i.pravatar.cc/150?img=31", reputation: 1500, location: "Edinburgh, Scotland" },
        { name: "Felix Nelson", profilePicture: "https://i.pravatar.cc/150?img=32", reputation: 2500, location: "Reykjavik, Iceland" },
        { name: "Georgia Ward", profilePicture: "https://i.pravatar.cc/150?img=33", reputation: 1700, location: "Bratislava, Slovakia" },
        { name: "Harry Carter", profilePicture: "https://i.pravatar.cc/150?img=34", reputation: 3100, location: "Ljubljana, Slovenia" },
        { name: "Isla Bennett", profilePicture: "https://i.pravatar.cc/150?img=35", reputation: 1450, location: "Tallinn, Estonia" },
        { name: "James King", profilePicture: "https://i.pravatar.cc/150?img=36", reputation: 2750, location: "Riga, Latvia" },
        { name: "Kara Fisher", profilePicture: "https://i.pravatar.cc/150?img=37", reputation: 2100, location: "Vilnius, Lithuania" },
        { name: "Lucas Morgan", profilePicture: "https://i.pravatar.cc/150?img=38", reputation: 3200, location: "Bucharest, Romania" },
        { name: "Megan Rogers", profilePicture: "https://i.pravatar.cc/150?img=39", reputation: 2000, location: "Sofia, Bulgaria" },
        { name: "Nathan Simmons", profilePicture: "https://i.pravatar.cc/150?img=40", reputation: 1850, location: "Belgrade, Serbia" },
        { name: "Olga James", profilePicture: "https://i.pravatar.cc/150?img=41", reputation: 2750, location: "Zagreb, Croatia" },
        { name: "Peter Hayes", profilePicture: "https://i.pravatar.cc/150?img=42", reputation: 2350, location: "Sarajevo, Bosnia" },
        { name: "Quincy Diaz", profilePicture: "https://i.pravatar.cc/150?img=43", reputation: 1950, location: "Podgorica, Montenegro" },
        { name: "Rachel Knight", profilePicture: "https://i.pravatar.cc/150?img=44", reputation: 1400, location: "Skopje, North Macedonia" },
        { name: "Samuel Hill", profilePicture: "https://i.pravatar.cc/150?img=45", reputation: 2250, location: "Tirana, Albania" },
        { name: "Tina Brooks", profilePicture: "https://i.pravatar.cc/150?img=46", reputation: 2500, location: "Pristina, Kosovo" }
      ];
      

      

  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-6 text-gray-900 dark:text-white pt-10">
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Users</h1>

      <input
        type="text"
        placeholder="Filter by user"
        className="w-full p-2 mb-6 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user, index) => (
          <div
            key={index}
            className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center space-x-4 "
          >
            <img
              src={user.profilePicture}
              alt={user.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user.location}</p>
              <p className="text-sm font-bold">Reputation: {user.reputation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default Users;
