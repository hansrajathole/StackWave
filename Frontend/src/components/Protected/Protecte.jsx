import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoginModalOpen(true); // Open login modal if no token
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    // For example, setting token manually (Replace this with actual login logic)
    navigate("/login");
    setIsAuthenticated(true);
    setIsLoginModalOpen(false);
  };

  return (
    <>
      {isAuthenticated ? (
        children
      ) : (
        <Dialog
          open={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-white text-center">
            <h2 className="text-2xl font-semibold mb-4">Login Required</h2>
            <p className="text-gray-300 mb-4">
              You need to login first to view this content.
            </p>
            <button
              onClick={handleLogin}
              className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login Now
            </button>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default ProtectedRoute;
