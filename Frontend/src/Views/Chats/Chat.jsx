// UserList.jsx
const users = [
    { id: 1, name: "Alice 🧑‍💻" },
    { id: 2, name: "Bob 📱" },
    { id: 3, name: "Charlie 🌐" },
    { id: 4, name: "Daisy 🔧" },
  ];
  
  const Chat = () => {
    const handleUserClick = (user) => {
      console.log("Clicked user:", user.name);
      // You can trigger chat open here
    };
  
    return (
      <div className="min-h-screen bg-zinc-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-6">Users</h1>
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserClick(user)}
              className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 p-4 rounded-xl shadow transition"
            >
              {user.name}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Chat;
  