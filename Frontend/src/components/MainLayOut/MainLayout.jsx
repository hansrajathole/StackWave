import React, { use, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Protected from "../Protected/Protecte";
import Navbar from "../Navbar/Navbar";
import Room from "../../Views/Room/Room";
import Users from "../../Views/Users/Users";
import Home from "../../Views/Home/Home";
import Question from "../../Views/Question/Question";
import PageNotFound from "../../Views/404/PageNotFound";
import Chat from "../../Views/Chats/Chat";
import ChatWithUser from "../../Views/Chats/ChatWithUser";
import Sidebar from "../Navbar/Sidebar";
import AskQuestion from "../../Views/AskQuestion/AskQuestion";
import { useSelector } from "react-redux";
import SingleQuestion from "../../Views/Question/SingleQuestion";
const MainLayout = () => {

  
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  

  return (
    <div className=" flex">
      <div>
        <Navbar />
      </div>
      <div className="flex justify-between w-full ">
        <div className={`${isOpen?"w-64 ": "w-0 hidden"} transition-all duration-300 ease-in-out`}>
          <Sidebar />
        </div>
        <div className={`${isOpen?"w-[90%]": "w-[100%]"} mt-10 max-sm:w-full`}>
          <Routes>
            <Route
              path="/questions"
              element={
                <Protected>
                  <Question />
                </Protected>
              }
            />
            <Route
              path="/question/:id"
              element={
                <Protected>
                  <SingleQuestion />
                </Protected>
              }
            />
            <Route
              path="/room"
              element={
                <Protected>
                  <Room />
                </Protected>
              }
            />
            <Route
              path="/chat"
              element={
                <Protected>
                  <Chat />
                </Protected>
              }
            />
            <Route
              path="/chat/:id"
              element={
                <Protected>
                  <ChatWithUser />
                </Protected>
              }
            />
            <Route
              path="/users"
              element={
                <Protected>
                  <Users />
                </Protected>
              }
            />
            <Route
              path="/askquestion"
              element={
                <Protected>
                  <AskQuestion />
                </Protected>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
