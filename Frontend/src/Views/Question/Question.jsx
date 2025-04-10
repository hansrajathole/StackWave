import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
  const navigate = useNavigate();
  const [tags, setTags] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    await axios
      .post(
        "http://localhost:3000/api/questions",
        { title, body, tags: tags.split(",").map((t) => t.trim()) },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res.data.question);
        fetchQuestions();
      })
      .catch((err) => {
        console.log(err);
      });

    setIsOpen(false);
    setTitle("");
    setBody("");
    setTags("");
  };

  const fetchQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/questions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data.questions);
      setQuestions(res.data.questions);
    } catch (err) {
      console.error("Error fetching questions", err);
    }
  };
  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    // <div className="bg-gray-900 h-full p-2">
    //   <div className=" top-5 left-60 right-0 z-10 bg-gray-900 border-b border-gray-700">
    //     <div className="mx-auto px-6  text-white  pt-14  flex justify-between ">
    //       <h2 className="text-3xl font-bold text-center mb-6">
    //         Newest Questions
    //       </h2>

    //       <Button className=" bg-blue-600 hover:bg-blue-700 text-white"
    //       onClick={()=>{navigate("/askquestion")}}
    //       >
    //         Ask Question
    //       </Button>
    //     </div>
    //     <div className="px-6 flex  justify-between items-center pb-2">
    //       <p>{questions?.length} questions</p>
    //       <div className="flex text-center items-center justify-between gap-2">
    //         <Select>
    //           <SelectTrigger className=" bg-gray-800 text-white border-none">
    //             <SelectValue placeholder="Filter" className="font-bold " />
    //           </SelectTrigger>
    //           <SelectContent className="bg-gray-800 text-white">
    //             <SelectItem value="all">All</SelectItem>
    //             <SelectItem value="javascript">JavaScript</SelectItem>
    //             <SelectItem value="python">Python</SelectItem>
    //             <SelectItem value="java">Java</SelectItem>
    //             <SelectItem value="c">C</SelectItem>
    //             <SelectItem value="cpp">C++</SelectItem>
    //             <SelectItem value="typeScript">TypeScript</SelectItem>
    //             <SelectItem value="go">Go</SelectItem>
    //             <SelectItem value="ruby">Ruby</SelectItem>
    //             <SelectItem value="rust">Rust</SelectItem>
    //           </SelectContent>
    //         </Select>
    //       </div>
    //     </div>
    //   </div>
    //   <br />

    //   <div className="space-y-6 px-2">
    //     {questions?.map((q) => (
    //       <Card key={q._id} className="bg-gray-900 text-white py-3">
    //         <CardContent className="">
    //           <div className="flex justify-between items-start">
    //             <div>
    //               <h3
    //                 className="text-xl font-bold hover:underline cursor-pointer text-blue-500"
    //                 onClick={() => navigate(`/question/${q._id}`)}
    //               >
    //                 {q.title}
    //               </h3>
    //               <p className="text-sm text-gray-300 ">{q.body}</p>
    //               <div className="mt-2 flex flex-wrap gap-2">
    //                 {q?.tags?.map((tag, i) => (
    //                   <Badge key={i} variant="secondary">
    //                     {tag}
    //                   </Badge>
    //                 ))}
    //               </div>
    //             </div>
    //             <div className="text-right">
    //               <p className="text-sm">Votes: {q?.votes}</p>
    //               <p className="text-sm text-gray-400">
    //                 Answers: {q?.answers?.length}
    //               </p>
    //             </div>
    //           </div>
    //         </CardContent>
    //       </Card>
    //     ))}
    //   </div>
    // </div>
    <div className="bg-white dark:bg-gray-900 min-h-screen p-2 text-gray-900 dark:text-white">
  <div className="top-5 left-60 right-0 z-10 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
    <div className="mx-auto px-6 pt-8 flex justify-between max-sm:items-center">
      <h2 className="text-3xl max-sm:text-3xl font-bold text-center mb-6">
        Newest Questions
      </h2>

      <Button
        className="bg-blue-600 hover:bg-blue-700 text-white"
        onClick={() => {
          navigate("/askquestion");
        }}
      >
        Ask Question
      </Button>
    </div>

    <div className="px-6 flex justify-between items-center pb-2">
      <p>{questions?.length} questions</p>
      <div className="flex text-center items-center gap-2">
        <Select>
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
            <SelectItem value="typeScript">TypeScript</SelectItem>
            <SelectItem value="go">Go</SelectItem>
            <SelectItem value="ruby">Ruby</SelectItem>
            <SelectItem value="rust">Rust</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>

  <br />

  <div className="space-y-6 px-2">
    {questions?.map((q) => (
      <Card key={q._id} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-3">
        <CardContent>
          <div className="flex justify-between items-start">
            <div>
              <h3
                className="text-xl font-bold hover:underline cursor-pointer text-blue-600 dark:text-blue-400"
                onClick={() => navigate(`/question/${q._id}`)}
              >
                {q.title}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">{q.body}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {q?.tags?.map((tag, i) => (
                  <Badge key={i} className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
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
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
</div>

  );
};

export default Question;
