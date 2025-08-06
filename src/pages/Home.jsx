import { useEffect, useState, useContext } from "react";
import axios from "../utils/axiosConfig";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("/posts", { withCredentials: true })
      .then((res) => {
        console.log("Fetched posts:", res.data); 
        setPosts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">All Posts</h1>
      {posts.map((post) => (
        <div key={post._id} className="border rounded p-4 mb-4">
          <div className="text-sm text-gray-500">
            {post.author.name} &bull;{" "}
            {new Date(post.createdAt).toLocaleString()}
          </div>
          <p className="mt-2">{post.content}</p>
        </div>
      ))}
    </div>
  );
}
