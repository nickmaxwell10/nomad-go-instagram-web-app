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
        `http://localhost:3000/instagram/posts/${hashtag}`
      );
      const postsJson = await response.json();
      setPosts(postsJson);
    }
    fetchPosts();
  }, [hashtag]);

  return (
    <>
      {posts ? (
        <div className="grid grid-cols-3 gap-10">
          {posts.map((post: any, idx: number) => (
            <div key={`post_${idx}`} className="w-56 h-56 rounded" onClick={() => {onPostSelected(post)}} >
              <img className="w-56 h-56" src={post.image} alt="Post" />
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
