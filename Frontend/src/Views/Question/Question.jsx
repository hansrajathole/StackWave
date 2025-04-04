import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

const Question = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [answers, setAnswers] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      const question = {
        id: Date.now(),
        text: newQuestion,
        votes: 0,
        author: "John Doe",
        answers: [],
      };
      setQuestions([question, ...questions]);
      setNewQuestion("");
      setIsOpen(false);
    }
  };

  const handleVote = (id, value) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, votes: q.votes + value } : q))
    );
  };

  const handleDelete = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleAnswerSubmit = (e, id) => {
    e.preventDefault();
    if (answers[id]?.trim()) {
      setQuestions(
        questions.map((q) =>
          q.id === id
            ? { ...q, answers: [...q.answers, { id: Date.now(), text: answers[id], author: "Jane Doe" }] }
            : q
        )
      );
      setAnswers({ ...answers, [id]: "" });
    }
  };

  return (
    <div className=" mx-auto p-6 bg-gray-900 text-white min-h-full pt-14">
      <h2 className="text-3xl font-bold text-center mb-6">Community Questions</h2>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition block mx-auto mb-6"
      >
        Ask a Question
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 flex items-center justify-center backdrop:blur-xs">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
          <h3 className="text-xl font-semibold mb-4">Ask Your Question</h3>
          <form onSubmit={handleQuestionSubmit}>
            <textarea
              className="w-full p-3 border rounded bg-gray-700 text-white"
              rows="4"
              placeholder="Type your question here..."
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
            ></textarea>
            <div className="flex justify-end mt-4">
              <button onClick={() => setIsOpen(false)} className="bg-gray-600 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700 transition">Cancel</button>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Post</button>
            </div>
          </form>
        </div>
      </Dialog>

      {questions.length === 0 ? (
        <p className="text-gray-400 text-center">No questions yet. Be the first to ask!</p>
      ) : (
        questions.map((q) => (
          <div key={q.id} className="bg-gray-800 p-6 rounded-lg shadow mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{q.text}</h3>
                <p className="text-sm text-gray-400">Asked by {q.author}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleVote(q.id, 1)} className="bg-green-500 text-white px-3 py-1 rounded">▲ {q.votes}</button>
                <button onClick={() => handleVote(q.id, -1)} className="bg-red-500 text-white px-3 py-1 rounded">▼</button>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold">Answers:</h4>
              <ul className="mt-2">
                {q.answers.map((ans) => (
                  <li key={ans.id} className="border-b border-gray-700 py-2">
                    <p>{ans.text}</p>
                    <span className="text-xs text-gray-400">- {ans.author}</span>
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={(e) => handleAnswerSubmit(e, q.id)} className="mt-4">
              <textarea
                className="w-full p-3 border rounded bg-gray-700 text-white"
                rows="2"
                placeholder="Write your answer..."
                value={answers[q.id] || ""}
                onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
              ></textarea>
              <button type="submit" className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Submit Answer</button>
            </form>

            <button onClick={() => handleDelete(q.id)} className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">Delete Question</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Question;
