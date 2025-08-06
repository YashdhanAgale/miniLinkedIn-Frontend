import { useEffect, useState, useContext } from "react";
import axios from "../utils/axiosConfig";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`/posts/user/${user._id}`, { withCredentials: true })
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, [user]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-semibold">{user.name}'s Profile</h1>
      <p className="text-gray-600 mb-4">{user.bio}</p>
      <h2 className="text-xl font-medium mb-2">Your Posts</h2>
      {posts.map((post) => (
        <div key={post._id} className="border rounded p-4 mb-4">
          <div className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </div>
          <p className="mt-2">{post.content}</p>
        </div>
      ))}
    </div>
  );
}
