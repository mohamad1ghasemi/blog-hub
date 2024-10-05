"use client";
import React, { useState} from "react";
import PaginationControls from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import { Post } from '../types'; // Import Post type
import {fetchData} from '../lib/api';
export default function PostList({
  currentPage,
  postsPerPage,
}: {
  currentPage: number;
  postsPerPage: number;
}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);


      setPosts(fetchData():Promise);
      setFilteredPosts(fetchData()); 

  const page = currentPage;
  const per_page = postsPerPage;

  const start = (page - 1) * per_page;
  const end = start + per_page;

  const entries = filteredPosts.slice(start, end); // Use filteredPosts instead of posts for pagination

  return (
    <div>
      {/* SearchBar to filter posts */}
      <SearchBar posts={posts} setFilteredPosts={setFilteredPosts} />

      <ul className="space-y-4 p-4">
        {entries.map((post: Post) => (
          <li
            key={post.id}
            className="p-4 bg-white shadow-md rounded-lg text-gray-700"
          >
            <h2 className="text-xl font-semibold">{post.title}</h2>
          </li>
        ))}
      </ul>

      <PaginationControls 
        hasNextPage={end < filteredPosts.length} 
        hasPrevPage={start > 0} 
        totalPosts={filteredPosts.length} 
        perPage={per_page} 
      />
    </div>
  );
}
