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
const Question = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
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

  console.log(questions);

  return (
    <div className="bg-gray-900 h-full p-2">
      <div className="fixed top-5 left-60 right-0 z-10 bg-gray-900 border-b border-gray-700">
        <div className="mx-auto px-6  text-white  pt-14  flex justify-between ">
          <h2 className="text-3xl font-bold text-center mb-6">
            Newest Questions
          </h2>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className=" bg-blue-600 hover:bg-blue-700 text-white">
                Ask Question
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 text-white border-gray-700">
              <DialogHeader>
                <DialogTitle>Ask a new question</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <input
                  className="w-full p-2 rounded border border-gray-300"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  className="w-full p-2 rounded border border-gray-300"
                  rows={4}
                  placeholder="Body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <input
                  className="w-full p-2 rounded border border-gray-300"
                  placeholder="Tags (comma separated)"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
                <DialogFooter className="mt-4">
                  <DialogClose asChild>
                    <Button type="button" variant="ghost">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Post
                  </Button>
                </DialogFooter>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="px-6 flex  justify-between items-center pb-2">
          <p>123456789 questions</p>
          <div className="flex text-center items-center justify-between gap-2">
            <Select>
              <SelectTrigger className=" bg-gray-800 text-white border-none">
                <SelectValue placeholder="Filter" className="font-bold " />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white">
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
      <hr />
      <br />
      <div className="space-y-6 px-2 mt-28">
        {questions?.map((q) => (
          <Card key={q._id} className="bg-gray-900 text-white">
            <CardContent className="">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold hover:underline cursor-pointer">
                    {q.title}
                  </h3>
                  <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                    {q.body}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {q?.tags?.map((tag, i) => (
                      <Badge key={i} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm">Votes: {q?.votes}</p>
                  <p className="text-sm text-gray-400">
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
