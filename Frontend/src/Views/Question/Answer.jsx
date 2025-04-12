import React from 'react'

const Answer = () => {
  return (
    <>
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
    </>
  )
}

export default Answer
