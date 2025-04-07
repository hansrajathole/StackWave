// UserList.jsx
const users = [
    { id: 1, name: "Alice 🧑‍💻" },
    { id: 2, name: "Bob 📱" },
    { id: 3, name: "Charlie 🌐" },
    { id: 4, name: "Daisy 🔧" },
  ];
  
  const Chat = ({ onUserSelect, selectedUser }) => {
    return (
      <div className="w-64 p-4 space-y-2">
        <h2 className="text-xl font-bold mb-4">Users</h2>
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => onUserSelect(user)}
            className={`p-3 rounded-lg cursor-pointer hover:bg-zinc-700 transition  border ${
              selectedUser?.id === user.id ? "bg-zinc-700" : ""
            }`}
          >
            {user.name}
          </div>
        ))}
      </div>
    );
  };
  
  export default Chat;
  