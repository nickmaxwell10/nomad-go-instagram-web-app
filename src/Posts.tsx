import { useEffect, useState } from "react";
import LoadingPosts from "./LoadingPosts";

interface PostProps {
  hashtag: string;
  onPostSelected: Function;
}

const Posts: React.FC<PostProps> = ({ hashtag, onPostSelected }) => {
  const [posts, setPosts] = useState<any[] | null>(null);

  useEffect(() => {
    setPosts(null)
    async function fetchPosts() {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/instagram/posts/${hashtag}`
      );
      const postsJson = await response.json();
      setPosts(postsJson);
    }
    fetchPosts();
  }, [hashtag]);

  return (
    <>
      {posts ? (
        <div className="sm:grid sm:grid-cols-3 sm:gap-10">
          {posts.map((post: any, idx: number) => (
            <div key={`post_${idx}`} className="mb-10 sm:mb-0 w-96 h-96 sm:w-56 sm:h-56 rounded mb-5" onClick={() => {onPostSelected(post)}} >
              <img className="w-96 h-96 sm:w-56 sm:h-56" src={post.image} alt="Post" />
            </div>
          ))}
        </div>
      ) : (
        <LoadingPosts />
      )}
    </>
  );
};

export default Posts;
