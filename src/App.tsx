import { useState } from "react";
import Posts from "./Posts";
import Post from "./Post";

function App() {
  const [hashtag, setHashtag] = useState("instagram");
  const [hashtagInput, setHashtagInput] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);

  const onHashtagChange = (event: React.FormEvent<HTMLInputElement>) => {
    setHashtagInput(event.currentTarget.value);
  };

  const onHashtagSearchClick = (event: React.FormEvent) => {
    event.preventDefault();
    setHashtag(hashtagInput);
  };

  const onPostSelected = (post: any) => {
    setSelectedPost(post);
  };

  return (
    <div className="flex flex-col items-center justify-center mb-20 px-5 sm:px-0">
      {selectedPost ? (
        <Post
          post={selectedPost}
          onPostClosed={() => {
            setSelectedPost(null);
          }}
        />
      ) : (
        <>
          <p className="mt-10 text-4xl font-bold">#{hashtag}</p>
          <form onSubmit={(e) => onHashtagSearchClick(e)} className="py-10 sm:w-auto w-full px-5 sm:px-0">
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="relative sm:w-96">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="# Hashtag"
                onChange={onHashtagChange}
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
          <Posts
            hashtag={hashtag}
            onPostSelected={(post: any) => {
              onPostSelected(post);
            }}
          />
        </>
      )}
    </div>
  );
}

export default App;
