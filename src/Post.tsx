import { useEffect, useState } from "react";
import LoadingPost from "./LoadingPost";

interface PostProps {
  post: any;
  onPostClosed: any;
}

const Post: React.FC<PostProps> = ({ post, onPostClosed }) => {
  const [postInfo, setPostInfo] = useState<any | null>(null);

  useEffect(() => {
    async function fetchPostInfo() {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/instagram/post/${post.id}`
      );
      const postInfoJson = await response.json();
      setPostInfo(postInfoJson);
    }
    fetchPostInfo();
  }, []);

  let postTitleHtml: any[] = [];
  if (postInfo && postInfo.title) {
    const postTitle = postInfo.title.split(/(?=[^\w#_])|(?<= )/g);
    postTitleHtml = postTitle.map((str: any, idx: number) => {
      if (str.startsWith("#")) {
        return <span className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" key={`hashtag_${idx}`} onClick={() => onPostClosed(str.replace('#',''))}>{str}</span>;
      }
      return str;
    });
  }

  return (
    <>
      {postInfo ? (
        <div className="relative sm:top-20 mx-auto sm:p-5 sm:border sm:w-4/6 sm:shadow-lg rounded-md bg-white">
          <div
            className="relative float-right h-10 w-10 mt-5 sm:mt-0 mr-2 sm:mr-0"
            onClick={onPostClosed}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                fill="#0F1729"
              />
            </svg>
          </div>
          <div className="flex flex-col sm:flex-row justify-center mt-20">
            <div className="w-full h-full rounded">
              <img
                className="w-96 sm:w-auto h-full"
                src={post.image}
                alt="Post"
              />
            </div>
            <div className="mt-10 sm:mt-0 w-96 mx-5 sm:mx-0 sm:px-10 text-md leading-6 font-medium text-gray-900 h-full overflow-y-auto">
              <div className="flex flex-row mb-5">
                <img
                  className="w-10 h-10 rounded-full"
                  src={postInfo.authorImage}
                  alt="Post"
                />
                <div className="ml-5 mt-2 font-bold">{postInfo.author}</div>
              </div>
              <div className="mb-8">{postTitleHtml}</div>
              {postInfo.comments && postInfo.comments.length ? (
                postInfo.comments.map((comment: any, idx: number) => (
                  <div key={`comment_${idx}`} className="mt-4">
                    <div className="font-bold mb-1">{comment.commentUser}</div>
                    {comment.comment}
                  </div>
                ))
              ) : (
                <div className="mt-10 font-bold">No Comments</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <LoadingPost onPostClosed={onPostClosed} />
      )}
    </>
  );
};

export default Post;
