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

  const onHashtagSearchClick = () => {
    setHashtag(hashtagInput);
  };

  const onPostSelected = (post: any) => {
    setSelectedPost(post);
  };

  return (
    <div className="flex flex-col items-center justify-center mb-20">
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
          <div className="flex flex-row items-center justify-center py-10">
            <input
              className="w-72 shadow appearance-none border rounded py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="hashtag"
              name="hashtag"
              placeholder="# Hashtag"
              onChange={onHashtagChange}
            />
            <button
              onClick={onHashtagSearchClick}
              className="ml-3 bg-transparent hover:bg-gray-70 text-gray-70 font-semibold hover:text-white py-2 px-4 border border-gray-70 hover:border-transparent rounded"
            >
              Search
            </button>
          </div>
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
