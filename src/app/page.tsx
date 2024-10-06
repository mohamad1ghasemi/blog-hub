"use client";
import React, { useState } from "react";
import PostList from "./components/PostList";
import SearchBar from "./components/SearchBar";
import { Post } from './types'; // Import Post type

export default function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const currentPage = Number(searchParams.page) || 1;
  const postsPerPage = 8;

  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  return (
    <div className="w-full items-center">
      <SearchBar setFilteredPosts={setFilteredPosts} />
      <PostList currentPage={currentPage} postsPerPage={postsPerPage} filteredPosts={filteredPosts} />
    </div>
  );
}
