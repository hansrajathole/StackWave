import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNowStrict, format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Question = () => {
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [filterTag, setFilterTag] = useState("all");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const baseUrl =  import.meta.env.VITE_BACKEND_URL


  function formatTimeAgo(date) {
    const inputDate = new Date(date);
    const now = new Date();
    const differenceInDays = Math.floor((now - inputDate) / (1000 * 60 * 60 * 24));
    if (differenceInDays > 30) {
      return format(inputDate, "dd MMM yyyy");
    }
    return `${formatDistanceToNowStrict(inputDate)} ago`;
  }

  const handleSubmit = async () => {
    await axios
      .post(
        `${baseUrl}/api/questions`,
        {
          title,
          body,
          tags: tags.split(",").map((t) => t.trim().toLowerCase()), // Normalize to lowercase
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => fetchQuestions())
      .catch((err) => console.log(err));

    setTitle("");
    setBody("");
    setTags("");
  };

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/questions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestions(res.data.questions);
    } catch (err) {
      // console.error("Error fetching questions", err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // ✅ Proper filter logic for array or string format
  useEffect(() => {
    const filtered = questions.filter((question) => {
      if (filterTag === "all") return true;
      return question.tags.some((tag) => tag.toLowerCase() === filterTag.toLowerCase());
    });
    setFilteredQuestions(filtered);
  }, [questions, filterTag]);
  

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen p-2 text-gray-900 dark:text-white">
      <div className="top-5 left-60 right-0 z-10 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="mx-auto px-6 pt-8 flex justify-between max-sm:items-center">
          <h2 className="text-3xl font-bold text-center mb-6">
            Newest Questions
          </h2>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => navigate("/askquestion")}
          >
            Ask Question
          </Button>
        </div>

        <div className="px-6 flex justify-between items-center pb-2">
          <p>{filteredQuestions.length} questions</p>
          <div className="flex text-center items-center gap-2">
            <Select value={filterTag} onValueChange={(value) => setFilterTag(value)}>
              <SelectTrigger className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-none">
                <SelectValue placeholder="Filter" className="font-bold" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="c">C</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="ruby">Ruby</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <br />

      <div className="space-y-6 px-2 pl-6">
        {filteredQuestions.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
            No questions found for selected tag.
          </p>
        ) : (
          filteredQuestions.map((q) => (
            <Card
              key={q._id}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-3"
            >
              <CardContent>
                <div className="flex justify-between items-start">
                  <div>
                    <h3
                      className="text-xl font-bold hover:underline cursor-pointer text-blue-600 dark:text-blue-400"
                      onClick={() => navigate(`/question/${q._id}`)}
                    >
                      {q.title}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{q.body.slice(0,150)}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {q?.tags?.map((tag, i) => (
                        <Badge
                          key={i}
                          className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">Votes: {q?.votes}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Answers: {q?.answers?.length}
                    </p>
                    <p>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Asked by: {q?.authorId?.username}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {" "}
                        on {formatTimeAgo(q?.createdAt)}
                      </span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Question;
