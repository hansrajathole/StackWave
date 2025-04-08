import React, { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
const Question = () => {
  const data = [
    {
      title: "How to center a div in CSS?",
      body: "This is the detailed explanation for: How to center a div in CSS?",
      answer:
        "This is a sample answer for the question about: How to center a div in CSS?",
      vote: 138,
      tags: ["css", "html"],
      createdAt: "2025-04-06T12:24:27.074259Z",
    },
    {
      title: "What is a closure in JavaScript?",
      body: "This is the detailed explanation for: What is a closure in JavaScript?",
      answer:
        "This is a sample answer for the question about: What is a closure in JavaScript?",
      vote: -5,
      tags: ["javascript"],
      createdAt: "2025-04-05T12:24:27.074259Z",
    },
    {
      title: "Difference between == and === in JS?",
      body: "This is the detailed explanation for: Difference between == and === in JS?",
      answer:
        "This is a sample answer for the question about: Difference between == and === in JS?",
      vote: 101,
      tags: ["javascript"],
      createdAt: "2025-04-04T12:24:27.074259Z",
    },
    {
      title: "How to use useEffect in React?",
      body: "This is the detailed explanation for: How to use useEffect in React?",
      answer:
        "This is a sample answer for the question about: How to use useEffect in React?",
      vote: 50,
      tags: ["react", "hooks"],
      createdAt: "2025-04-03T12:24:27.074259Z",
    },
    {
      title: "What is the virtual DOM?",
      body: "This is the detailed explanation for: What is the virtual DOM?",
      answer:
        "This is a sample answer for the question about: What is the virtual DOM?",
      vote: -3,
      tags: ["react"],
      createdAt: "2025-04-02T12:24:27.074259Z",
    },
    {
      title: "How to create a REST API with Node.js?",
      body: "This is the detailed explanation for: How to create a REST API with Node.js?",
      answer:
        "This is a sample answer for the question about: How to create a REST API with Node.js?",
      vote: 57,
      tags: ["nodejs", "api"],
      createdAt: "2025-04-01T12:24:27.074259Z",
    },
    {
      title: "What is hoisting in JavaScript?",
      body: "This is the detailed explanation for: What is hoisting in JavaScript?",
      answer:
        "This is a sample answer for the question about: What is hoisting in JavaScript?",
      vote: 103,
      tags: ["javascript"],
      createdAt: "2025-03-31T12:24:27.074259Z",
    },
    {
      title: "How to handle state in React?",
      body: "This is the detailed explanation for: How to handle state in React?",
      answer:
        "This is a sample answer for the question about: How to handle state in React?",
      vote: 93,
      tags: ["react", "state"],
      createdAt: "2025-03-30T12:24:27.074259Z",
    },
    {
      title: "What is event bubbling?",
      body: "This is the detailed explanation for: What is event bubbling?",
      answer:
        "This is a sample answer for the question about: What is event bubbling?",
      vote: 47,
      tags: ["javascript"],
      createdAt: "2025-03-29T12:24:27.074259Z",
    },
    {
      title: "What is promise chaining in JS?",
      body: "This is the detailed explanation for: What is promise chaining in JS?",
      answer:
        "This is a sample answer for the question about: What is promise chaining in JS?",
      vote: 113,
      tags: ["javascript", "promises"],
      createdAt: "2025-03-28T12:24:27.074259Z",
    },
    {
      title: "How to optimize React app performance?",
      body: "This is the detailed explanation for: How to optimize React app performance?",
      answer:
        "This is a sample answer for the question about: How to optimize React app performance?",
      vote: 134,
      tags: ["react", "performance"],
      createdAt: "2025-03-27T12:24:27.074259Z",
    },
    {
      title: "What are hooks in React?",
      body: "This is the detailed explanation for: What are hooks in React?",
      answer:
        "This is a sample answer for the question about: What are hooks in React?",
      vote: 118,
      tags: ["react", "hooks"],
      createdAt: "2025-03-26T12:24:27.074259Z",
    },
    {
      title: "How to manage routes in React Router?",
      body: "This is the detailed explanation for: How to manage routes in React Router?",
      answer:
        "This is a sample answer for the question about: How to manage routes in React Router?",
      vote: 143,
      tags: ["react", "router"],
      createdAt: "2025-03-25T12:24:27.074259Z",
    },
    {
      title: "What is middleware in Express?",
      body: "This is the detailed explanation for: What is middleware in Express?",
      answer:
        "This is a sample answer for the question about: What is middleware in Express?",
      vote: 70,
      tags: ["nodejs", "express"],
      createdAt: "2025-03-24T12:24:27.074259Z",
    },
    {
      title: "Difference between var, let and const?",
      body: "This is the detailed explanation for: Difference between var, let and const?",
      answer:
        "This is a sample answer for the question about: Difference between var, let and const?",
      vote: 47,
      tags: ["javascript"],
      createdAt: "2025-03-23T12:24:27.074259Z",
    },
    {
      title: "How to debounce a function in JS?",
      body: "This is the detailed explanation for: How to debounce a function in JS?",
      answer:
        "This is a sample answer for the question about: How to debounce a function in JS?",
      vote: 47,
      tags: ["javascript", "performance"],
      createdAt: "2025-03-22T12:24:27.074259Z",
    },
    {
      title: "What is context API in React?",
      body: "This is the detailed explanation for: What is context API in React?",
      answer:
        "This is a sample answer for the question about: What is context API in React?",
      vote: 22,
      tags: ["react", "context"],
      createdAt: "2025-03-21T12:24:27.074259Z",
    },
    {
      title: "How to secure a Node.js API?",
      body: "This is the detailed explanation for: How to secure a Node.js API?",
      answer:
        "This is a sample answer for the question about: How to secure a Node.js API?",
      vote: 76,
      tags: ["nodejs", "security"],
      createdAt: "2025-03-20T12:24:27.074259Z",
    },
    {
      title: "What is CORS and how to handle it?",
      body: "This is the detailed explanation for: What is CORS and how to handle it?",
      answer:
        "This is a sample answer for the question about: What is CORS and how to handle it?",
      vote: 135,
      tags: ["api", "cors"],
      createdAt: "2025-03-19T12:24:27.074259Z",
    },
    {
      title: "How to use localStorage in JS?",
      body: "This is the detailed explanation for: How to use localStorage in JS?",
      answer:
        "This is a sample answer for the question about: How to use localStorage in JS?",
      vote: 145,
      tags: ["javascript", "storage"],
      createdAt: "2025-03-18T12:24:27.074259Z",
    },
    {
      title: "What are pure functions?",
      body: "This is the detailed explanation for: What are pure functions?",
      answer:
        "This is a sample answer for the question about: What are pure functions?",
      vote: 79,
      tags: ["javascript"],
      createdAt: "2025-03-17T12:24:27.074259Z",
    },
    {
      title: "How to build a login form in React?",
      body: "This is the detailed explanation for: How to build a login form in React?",
      answer:
        "This is a sample answer for the question about: How to build a login form in React?",
      vote: 68,
      tags: ["react", "forms"],
      createdAt: "2025-03-16T12:24:27.074259Z",
    },
    {
      title: "What is useRef in React?",
      body: "This is the detailed explanation for: What is useRef in React?",
      answer:
        "This is a sample answer for the question about: What is useRef in React?",
      vote: 147,
      tags: ["react", "hooks"],
      createdAt: "2025-03-15T12:24:27.074259Z",
    },
    {
      title: "Explain lifecycle methods in React.",
      body: "This is the detailed explanation for: Explain lifecycle methods in React.",
      answer:
        "This is a sample answer for the question about: Explain lifecycle methods in React.",
      vote: 122,
      tags: ["react"],
      createdAt: "2025-03-14T12:24:27.074259Z",
    },
    {
      title: "How to validate forms in React?",
      body: "This is the detailed explanation for: How to validate forms in React?",
      answer:
        "This is a sample answer for the question about: How to validate forms in React?",
      vote: 111,
      tags: ["react", "forms"],
      createdAt: "2025-03-13T12:24:27.074259Z",
    },
    {
      title: "What is a higher-order component?",
      body: "This is the detailed explanation for: What is a higher-order component?",
      answer:
        "This is a sample answer for the question about: What is a higher-order component?",
      vote: 14,
      tags: ["react", "hoc"],
      createdAt: "2025-03-12T12:24:27.074259Z",
    },
    {
      title: "Difference between props and state?",
      body: "This is the detailed explanation for: Difference between props and state?",
      answer:
        "This is a sample answer for the question about: Difference between props and state?",
      vote: 120,
      tags: ["react"],
      createdAt: "2025-03-11T12:24:27.074259Z",
    },
    {
      title: "What is JSX in React?",
      body: "This is the detailed explanation for: What is JSX in React?",
      answer:
        "This is a sample answer for the question about: What is JSX in React?",
      vote: 13,
      tags: ["react", "jsx"],
      createdAt: "2025-03-10T12:24:27.074259Z",
    },
    {
      title: "How to use map function in JS?",
      body: "This is the detailed explanation for: How to use map function in JS?",
      answer:
        "This is a sample answer for the question about: How to use map function in JS?",
      vote: 21,
      tags: ["javascript"],
      createdAt: "2025-03-09T12:24:27.074259Z",
    },
    {
      title: "How does async/await work?",
      body: "This is the detailed explanation for: How does async/await work?",
      answer:
        "This is a sample answer for the question about: How does async/await work?",
      vote: 71,
      tags: ["javascript", "async"],
      createdAt: "2025-03-08T12:24:27.074259Z",
    },
    {
      title: "What is a reducer function?",
      body: "This is the detailed explanation for: What is a reducer function?",
      answer:
        "This is a sample answer for the question about: What is a reducer function?",
      vote: 120,
      tags: ["javascript"],
      createdAt: "2025-03-07T12:24:27.074259Z",
    },
    {
      title: "How to implement dark mode in React?",
      body: "This is the detailed explanation for: How to implement dark mode in React?",
      answer:
        "This is a sample answer for the question about: How to implement dark mode in React?",
      vote: 119,
      tags: ["react", "dark-mode"],
      createdAt: "2025-03-06T12:24:27.074259Z",
    },
    {
      title: "How to fetch data from API in JS?",
      body: "This is the detailed explanation for: How to fetch data from API in JS?",
      answer:
        "This is a sample answer for the question about: How to fetch data from API in JS?",
      vote: 41,
      tags: ["javascript", "api"],
      createdAt: "2025-03-05T12:24:27.074259Z",
    },
    {
      title: "What is shallow copy vs deep copy?",
      body: "This is the detailed explanation for: What is shallow copy vs deep copy?",
      answer:
        "This is a sample answer for the question about: What is shallow copy vs deep copy?",
      vote: 17,
      tags: ["javascript"],
      createdAt: "2025-03-04T12:24:27.074259Z",
    },
    {
      title: "How to prevent re-renders in React?",
      body: "This is the detailed explanation for: How to prevent re-renders in React?",
      answer:
        "This is a sample answer for the question about: How to prevent re-renders in React?",
      vote: 28,
      tags: ["react", "performance"],
      createdAt: "2025-03-03T12:24:27.074259Z",
    },
    {
      title: "What is memoization?",
      body: "This is the detailed explanation for: What is memoization?",
      answer:
        "This is a sample answer for the question about: What is memoization?",
      vote: 56,
      tags: ["javascript"],
      createdAt: "2025-03-02T12:24:27.074259Z",
    },
    {
      title: "How to handle errors in async JS?",
      body: "This is the detailed explanation for: How to handle errors in async JS?",
      answer:
        "This is a sample answer for the question about: How to handle errors in async JS?",
      vote: 67,
      tags: ["javascript"],
      createdAt: "2025-03-01T12:24:27.074259Z",
    },
    {
      title: "What is the spread operator?",
      body: "This is the detailed explanation for: What is the spread operator?",
      answer:
        "This is a sample answer for the question about: What is the spread operator?",
      vote: 62,
      tags: ["react"],
      createdAt: "2025-02-28T12:24:27.074259Z",
    },
    {
      title: "What is the use of key prop in React?",
      body: "This is the detailed explanation for: What is the use of key prop in React?",
      answer:
        "This is a sample answer for the question about: What is the use of key prop in React?",
      vote: 5,
      tags: ["react", "lazy"],
      createdAt: "2025-02-27T12:24:27.074259Z",
    },
    {
      title: "How to lazy load components in React?",
      body: "This is the detailed explanation for: How to lazy load components in React?",
      answer:
        "This is a sample answer for the question about: How to lazy load components in React?",
      vote: 103,
      tags: ["react", "hooks"],
      createdAt: "2025-02-26T12:24:27.074259Z",
    },
    {
      title: "What is useCallback hook?",
      body: "This is the detailed explanation for: What is useCallback hook?",
      answer:
        "This is a sample answer for the question about: What is useCallback hook?",
      vote: 117,
      tags: ["react", "hooks"],
      createdAt: "2025-02-25T12:24:27.074259Z",
    },
    {
      title: "What is useMemo hook?",
      body: "This is the detailed explanation for: What is useMemo hook?",
      answer:
        "This is a sample answer for the question about: What is useMemo hook?",
      vote: 66,
      tags: ["http"],
      createdAt: "2025-02-24T12:24:27.074259Z",
    },
    {
      title: "Difference between GET and POST?",
      body: "This is the detailed explanation for: Difference between GET and POST?",
      answer:
        "This is a sample answer for the question about: Difference between GET and POST?",
      vote: 62,
      tags: ["web", "architecture"],
      createdAt: "2025-02-23T12:24:27.074259Z",
    },
    {
      title: "What is a SPA (Single Page Application)?",
      body: "This is the detailed explanation for: What is a SPA (Single Page Application)?",
      answer:
        "This is a sample answer for the question about: What is a SPA (Single Page Application)?",
      vote: 14,
      tags: ["react", "ssr"],
      createdAt: "2025-02-22T12:24:27.074259Z",
    },
    {
      title: "What is SSR (Server Side Rendering)?",
      body: "This is the detailed explanation for: What is SSR (Server Side Rendering)?",
      answer:
        "This is a sample answer for the question about: What is SSR (Server Side Rendering)?",
      vote: 149,
      tags: ["react"],
      createdAt: "2025-02-21T12:24:27.074259Z",
    },
    {
      title: "What is hydration in React?",
      body: "This is the detailed explanation for: What is hydration in React?",
      answer:
        "This is a sample answer for the question about: What is hydration in React?",
      vote: 2,
      tags: ["react", "hooks"],
      createdAt: "2025-02-20T12:24:27.074259Z",
    },
    {
      title: "Explain useLayoutEffect.",
      body: "This is the detailed explanation for: Explain useLayoutEffect.",
      answer:
        "This is a sample answer for the question about: Explain useLayoutEffect.",
      vote: 144,
      tags: ["react"],
      createdAt: "2025-02-19T12:24:27.074259Z",
    },
    {
      title: "What are controlled vs uncontrolled components?",
      body: "This is the detailed explanation for: What are controlled vs uncontrolled components?",
      answer:
        "This is a sample answer for the question about: What are controlled vs uncontrolled components?",
      vote: 109,
      tags: ["react", "animation"],
      createdAt: "2025-02-18T12:24:27.074259Z",
    },
    {
      title: "How to animate in React?",
      body: "This is the detailed explanation for: How to animate in React?",
      answer:
        "This is a sample answer for the question about: How to animate in React?",
      vote: 120,
      tags: ["ui", "ux"],
      createdAt: "2025-02-17T12:24:27.074259Z",
    },
    {
      title: "What is optimistic UI?",
      body: "This is the detailed explanation for: What is optimistic UI?",
      answer:
        "This is a sample answer for the question about: What is optimistic UI?",
      vote: 143,
      tags: ["general", "sample"],
      createdAt: "2025-02-16T12:24:27.074259Z",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");


  const handleSubmit = async () => {
      console.log("Submitting question:", { title, body, tags });
      setIsOpen(false);
      setTitle("");
      setBody("");
      setTags("");
      
  }

//   try {
//     const res = await axios.get("/api/question");
//     setQuestions(res.data);
//   } catch (err) {
//     console.error("Failed to fetch questions", err);
//   }

// const handleAskQuestion = async () => {
//   try {
//     await axios.post("/api/question", {
//       title,
//       body,
//       tags: tags.split(",").map((t) => t.trim()),
//     });
//     setTitle("");
//     setBody("");
//     setTags("");
//     fetchQuestions();
//   } catch (err) {
//     console.error("Failed to post question", err);
//   }
//  };

// useEffect(() => {
//   fetchQuestions();
// }, []);

  return (
    <div className="bg-gray-900 h-full">
      <div className="mx-auto px-6  text-white  pt-14 flex justify-between">
        <h2 className="text-3xl font-bold text-center mb-6">
          Newest Questions
        </h2>

       
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className=" bg-blue-600 hover:bg-blue-700 text-white">Ask Question</Button>
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
                <Button type="submit" onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
                  Post
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
        
      </div>
      <div className="px-6 flex  justify-between items-center">
        <p>123456789 questions</p>
        <div className="flex text-center items-center justify-between gap-2">
          <Select>
            <SelectTrigger className=" bg-gray-800 text-white border-none">
              <SelectValue placeholder="Filter" className='font-bold ' />
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
      <br />
      <hr />
      <br />
    </div>
  );
};

export default Question;
