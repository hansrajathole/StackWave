import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNowStrict } from "date-fns";
import ReactMarkdown from "react-markdown";

const SingleQuestion = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [newAnswer, setNewAnswer] = useState("");
  const token = localStorage.getItem("token");

  const fetchQuestion = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/questions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestion(res.data.question);
    } catch (err) {
      console.error("Error fetching question", err);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  const handleVote = async (type) => {
    try {
      await axios.post(
        `http://localhost:3000/api/questions/${id}/vote`,
        { type },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchQuestion(); // Refresh vote count
    } catch (err) {
      console.error("Vote error", err);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!newAnswer.trim()) return;
    try {
      await axios.post(
        `http://localhost:3000/api/questions/${id}/answer`,
        { text: newAnswer },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewAnswer("");
      fetchQuestion(); // Refresh answers
    } catch (err) {
      console.error("Answer submission error", err);
    }
  };

  if (!question) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-300 mt-10">
        Loading question...
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
          {question.title}
        </h1>

        <div className="flex flex-wrap gap-2 mb-4">
          {question.tags?.map((tag, i) => (
            <Badge key={i} className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
              {tag}
            </Badge>
          ))}
        </div>

        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Asked by <strong>{question.authorId?.username}</strong> •{" "}
              {formatDistanceToNowStrict(new Date(question.createdAt))} ago
            </div>
            <p className="text-base leading-relaxed">{question.body}</p>

            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-4">
              <span>Votes: {question.votes}</span>
              <Button size="sm" onClick={() => handleVote("upvote")}>
                👍 Upvote
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleVote("downvote")}>
                👎 Downvote
              </Button>
              <span>Answers: {question.answers?.length}</span>
            </div>
          </CardContent>
        </Card>

        {/* 🧾 Answer Form */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Your Answer</h2>
          <Textarea
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Write your answer in Markdown..."
            className="min-h-[150px] dark:bg-gray-800"
          />
          <div className="mt-2">
            <Button onClick={handleSubmitAnswer} className="bg-blue-600 text-white">
              Submit Answer
            </Button>
          </div>

          {/* 🔍 Markdown Preview */}
          {newAnswer.trim() && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Preview</h3>
              <Card className="bg-white dark:bg-gray-800">
                <CardContent className="prose dark:prose-invert max-w-none">
                  <ReactMarkdown>{newAnswer}</ReactMarkdown>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* 📜 Answer List */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">All Answers</h2>
          {question.answers?.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No answers yet.</p>
          ) : (
            question.answers.map((ans, i) => (
              <Card key={i} className="bg-white dark:bg-gray-800 mb-4">
                <CardContent className="p-4 prose dark:prose-invert">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Answered by: <strong>{ans.username}</strong>
                  </div>
                  <ReactMarkdown>{ans.text}</ReactMarkdown>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleQuestion;
