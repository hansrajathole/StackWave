// Assuming this is part of your existing SingleQuestion.js file

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FiSend } from "react-icons/fi";
import Markdown from "markdown-to-jsx";
import { toast } from "react-toastify";

const AnswerComments = ({ answerId, comments, refresh }) => {
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.auth.user);
  const token = localStorage.getItem("token");
  const baseUrl = import.meta.env.VITE_BACKEND_URL

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;
    try {
      await axios.post(
        `${baseUrl}/api/answers/${answerId}/comments`,
        { content : comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComment("");
      refresh();
      toast.success("Comment added");
    } catch (err) {
      toast.error("Failed to add comment");
    }
  };

  return (
    <div className="mt-4">
      {/* Comment Input */}
      <div className="flex gap-2 items-center">
        <Textarea
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="flex-1 text-sm bg-white dark:bg-gray-800"
        />
        <Button onClick={handleCommentSubmit} size="sm" className="bg-blue-600 text-white">
          <FiSend size={16} />
        </Button>
      </div>
    </div>
  );
};

export default AnswerComments;
