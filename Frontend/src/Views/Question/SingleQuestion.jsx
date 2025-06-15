import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MDEditor from "@uiw/react-md-editor";
import { formatDistanceToNowStrict } from "date-fns";
import Markdown from "markdown-to-jsx";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { FiEdit, FiTrash } from "react-icons/fi";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import AnswerComments from "../../components/AnswerComments";

const SingleQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [newAnswer, setNewAnswer] = useState("");
  const [questionVotes, setVotes] = useState(0);
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.auth.user);
  const baseUrl =  import.meta.env.VITE_BACKEND_URL


  const fetchQuestion = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/questions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(res.data.question.answers);
      const queVote = res.data?.question?.upVotes.length - res.data?.question?.downVote.length 
      
      setVotes(queVote);
      setQuestion(res.data.question);
    } catch (err) {
      // console.error("Error fetching question", err);
      toast.error("Failed to fetch question");
    }
  };

  const handleQuestionVote = async (voteType) => {
    try {
      const res = await axios.patch(
        `${baseUrl}/api/questions/vote/${id}`,
        { voteType },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setVotes(res.data?.upVotes - res.data?.downVotes);
      
    } catch {
      toast.error("Vote failed");
    }
  };

  const handleAnswerVote = async (answerId, voteType) => {
    try {
      await axios.patch(
        `${baseUrl}/api/answers/vote/${answerId}`,
        { voteType },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchQuestion();
    } catch {
      toast.error("Failed to record vote");
    }
  };

  const handleSubmitAnswer = async () => {
    if (!newAnswer.trim()) return;
    try {
      await axios.post(
        `${baseUrl}/api/answers/${id}`,
        { content: newAnswer },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewAnswer("");
      fetchQuestion();
      toast.success("Answer posted successfully!");
    } catch (err) {
      // console.error("Answer submission error", err);
      toast.error("Failed to post answer");
    }
  };

  const handleDeleteQuestion = async () => {
    try {
      await axios.delete(`${baseUrl}/api/questions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Question deleted!");
      navigate("/questions");
    } catch (err) {
      // console.error("Failed to delete question:", err);
      toast.error("Failed to delete question");
    }
  };

  const handleDeleteAnswer = async (answerId) => {
    try {
      await axios.delete(`${baseUrl}/api/answers/${answerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Answer deleted successfully");
      fetchQuestion();
    } catch (err) {
      // console.error("Error deleting answer:", err);
      toast.error("Failed to delete answer");
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  if (!question)
    return (
      <p className="text-center mt-10 text-gray-500 dark:text-gray-300">
        Loading...
      </p>
    );

  return (
    <div className="mx-auto px-8 py-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Top section with title + edit/delete */}
      <div className="mb-6 border-b pb-4 border-gray-300 dark:border-gray-700 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {question.title}
          </h1>
          <div className="flex flex-wrap gap-2 mb-1 ">
            {question.tags?.map((tag, idx) => (
              <Badge
                key={idx}
                className="text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Asked by <strong>{question.authorId?._id === user?._id ? "you" :question.authorId?.username}</strong> •{" "}
            {formatDistanceToNowStrict(new Date(question.createdAt))} ago
          </p>
        </div>

        {question.authorId?._id === user?._id && (
          <div className="flex items-center gap-3 mt-1">
            <button variant="ghost" size="icon">
              <FiEdit className="hover:text-yellow-400" size={22} />
            </button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button variant="ghost" size="icon">
                  <FiTrash className="hover:text-red-500" size={22} />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to delete this question?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteQuestion}>
                    Yes, Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>

      {/* Question Section */}
      <div className="flex gap-4 mb-12">
        <div className="flex flex-col items-center p-2 gap-1">
          <button onClick={() => handleQuestionVote("up")}>
            <CiCircleChevUp size={28} className="hover:text-blue-500" />
          </button>
          <span className="text-lg font-semibold">{questionVotes}</span>
          <button onClick={() => handleQuestionVote("down")}>
            <CiCircleChevDown size={28} className="hover:text-red-500" />
          </button>
        </div>

        <div className="flex-1 prose dark:prose-invert max-w-none bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
          <Markdown options={{ forceBlock: true }}>{question.body}</Markdown>
        </div>
      </div>

      {/* Answer Submission */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">Your Answer</h2>
        <div
          data-color-mode={
            document.documentElement.classList.contains("dark")
              ? "dark"
              : "light"
          }
          className="bg-gray-100 dark:bg-gray-800 p-1 rounded-md"
        >
          <MDEditor value={newAnswer} onChange={setNewAnswer} height={400} />
        </div>
        <Button
          onClick={handleSubmitAnswer}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
        >
          Submit Answer
        </Button>
      </div>

      {/* Answers */}
      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-6">
          {question.answers?.length || 0} Answers
        </h2>

        {question.answers?.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No answers yet.</p>
        ) : (
          question.answers.map((ans, idx) => (
          
            <div key={idx} className="flex gap-4 mb-8">
              {/* Votes */}
              {console.log()}

              <div className="flex flex-col items-center pt-2 gap-1">
                <button onClick={() => handleAnswerVote(ans._id, "up")}>
                  <CiCircleChevUp size={28} className="hover:text-blue-500" />
                </button>
                <span className="font-medium">{ans.upVotes?.length - ans.downVotes?.length}</span>
                <button onClick={() => handleAnswerVote(ans._id, "down")}>
                  <CiCircleChevDown size={28} className="hover:text-red-500" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1">
                <Card className="bg-gray-100 dark:bg-gray-800 py-1">
                  <CardContent className="p-4 prose dark:prose-invert max-w-none">
                    <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                      <span className="opacity-65">
                        Answered by <strong>{ans.authorId?._id === user._id ? "you": ans.authorId.username}</strong>
                      </span>
                      {ans.authorId?._id === user?._id && (
                        <div className="flex gap-2 items-center">
                          <button>
                            <FiEdit
                              className="hover:text-yellow-400"
                              size={18}
                            />
                          </button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button>
                                <FiTrash
                                  className="hover:text-red-500"
                                  size={18}
                                  />
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete this answer?
                                </AlertDialogTitle>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteAnswer(ans._id)}
                                  >
                                  Yes
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      )}
                    </div>
                    <Markdown>{ans.content}</Markdown>

                    {/* 💬 Comment Section */}
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                        Comments
                      </h4>

                      {ans.comments?.length === 0 ? (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                          No comments yet.
                        </p>
                      ) : (
                        <ul className="space-y-3">
                          {ans.comments.map((comment, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border dark:border-gray-700"
                            >
                              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                                {comment.username?.[0]?.toUpperCase() || "U"}
                              </div>
                              <div className="text-sm text-gray-800 dark:text-gray-100">
                                <span className="font-semibold mr-1">
                                  {comment.username}
                                </span>
                                <span className="text-gray-600 dark:text-gray-400">
                                  {comment.content}
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Add Comment Box */}
                      <div className="mt-4">
                        <AnswerComments
                          answerId={ans._id}
                          comments={ans.comments}
                          refresh={fetchQuestion}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SingleQuestion;
