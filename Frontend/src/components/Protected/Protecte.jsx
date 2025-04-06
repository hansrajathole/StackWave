import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); // Get user from Redux

  useEffect(() => {
    if (!user) {
      setIsAuthenticated(false);
      setIsLoginModalOpen(true); // Open login modal
    } else {
      setIsAuthenticated(true);
    }
  }, [user]);

  const handleLogin = () => {
    setIsLoginModalOpen(false);
    navigate("/login");
  };


  const handleClose = () => {
    setIsLoginModalOpen(false);
    navigate("/");
  }
  if (isAuthenticated) {
    return children;
  }



  return (
    <Dialog open={isLoginModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Login Required</DialogTitle>
          <DialogDescription>
            You must be logged in to access this page. Please login to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end mt-4">
          <Button onClick={handleLogin}>Go to Login</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProtectedRoute;
