import React from "react";
type Post = {
  id: number;
  title: string;
  author: string;
  content: string;
  genre: string;
};

export default async function Postspage() {
  const response = await fetch("http://localhost:3001/posts");
  const posts = await response.json();
  return (
    <ul className="space-y-4 p-4">
      {posts.map((post: Post) => (
        <li
          key={post.id}
          className="p-4 bg-white shadow-md rounded-lg text-gray-700"
        >
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p>{post.id}</p>
          <p>{post.author}</p>
          <p>{post.genre}</p>
        </li>
      ))}
    </ul>
  );
}
