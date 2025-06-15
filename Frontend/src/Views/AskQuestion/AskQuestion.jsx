import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MDEditor from '@uiw/react-md-editor';

function AskQuestion() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
const baseUrl = import.meta.env.VITE_BACKEND_URL



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!title.trim() || !body.trim() || !tags.trim()) {
      setError('Please fill in all fields: Title, Body, and Tags.');
      setLoading(false);
      return;
    }

    const processedTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    if (processedTags.length === 0) {
      setError('Please enter at least one valid tag.');
      setLoading(false);
      return;
    }

    if (processedTags.length > 5) {
      setError('You can add a maximum of 5 tags.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/api/questions`, {
        title: title.trim(),
        body,
        tags: processedTags,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      navigate('/questions');
    } catch (err) {
      // console.log(err);
      
      setError(err.response?.data?.message || 'Failed to post question. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4 bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      
      {/* Main Content Area */}
      <div className="flex-grow bg-gray-50 dark:bg-gray-900 p-6 rounded-lg shadow space-y-6">
        <h1 className="text-3xl font-bold mb-4">Ask a Public Question</h1>

        {error && (
          <div className="bg-red-100 dark:bg-red-200/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 p-4 rounded">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">(Be specific and clear)</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              minLength={15}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g. How to implement dark mode toggle with Tailwind CSS and React?"
            />
          </div>

          {/* Body */}
          <div>
            <label htmlFor="body" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Body
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">(Include all the details)</span>
            </label>
            <div
              data-color-mode={document.documentElement.classList.contains('dark') ? 'dark' : 'light'}
              className="bg-white dark:bg-gray-800 p-1 rounded-md"
            >
              <MDEditor
                value={body}
                onChange={setBody}
                height={400}
                preview="live"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tags
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">(Up to 5, comma-separated)</span>
            </label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="e.g. react,javascript,tailwind-css"
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Use commas to separate tags.</p>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium shadow disabled:opacity-50"
            >
              {loading ? 'Posting...' : 'Post Your Question'}
            </button>
          </div>
        </form>
      </div>

      {/* Sidebar */}
      <aside className="lg:w-80 flex-shrink-0">
        <div className="sticky top-20 bg-blue-50 dark:bg-gray-800/50 border border-blue-200 dark:border-gray-700 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">How to Ask a Good Question</h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 list-disc list-inside">
            <li>Summarize the problem in the title.</li>
            <li>Describe the issue clearly in the body.</li>
            <li>Include relevant code snippets (use Markdown).</li>
            <li>Explain what you’ve already tried.</li>
            <li>Use appropriate tags.</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default AskQuestion;
