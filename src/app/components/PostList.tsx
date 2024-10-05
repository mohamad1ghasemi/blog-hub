import React from "react";
import PaginationControls from '../components/Pagination'

type Post = {
  id: number;
  title: string;
  author: string;
  content: string;
  genre: string;
};

export default async function PostList({
  currentPage,
  postsPerPage,
  searchParams,
}: {
  currentPage: number;
  postsPerPage: number;
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const response = await fetch("http://localhost:3001/posts");
  const posts = await response.json();

  const page = currentPage;
  const per_page = postsPerPage;

  const start = (page - 1) * per_page;
  const end = start + per_page;

  const entries = posts.slice(start, end);
  return (
    <ul className="space-y-4 p-4">
      {entries.map((post: Post) => (
        <li
          key={post.id}
          className="p-4 bg-white shadow-md rounded-lg text-gray-700"
        >
          <h2 className="text-xl font-semibold">{post.title}</h2>
        </li>
      ))}
      <PaginationControls 
        hasNextPage={end < posts.length} 
        hasPrevPage={start > 0} 
        totalPosts={posts.length} 
        perPage={per_page} 
      />
    </ul>
  );
}
