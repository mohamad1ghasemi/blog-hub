"use client";

import React from "react";
import PaginationControls from "../components/Pagination";
import { Post } from "../types";
import Link from "next/link";

interface PostListProps {
  currentPage: number;
  postsPerPage: number;
  filteredPosts: Post[];
}

export default function PostList({
  currentPage,
  postsPerPage,
  filteredPosts,
}: PostListProps) {
  const page = currentPage;
  const per_page = postsPerPage;

  const start = (page - 1) * per_page;
  const end = start + per_page;

  const entries = filteredPosts.slice(start, end);

  return (
    <div className="w-full px-4 sm:px-8">
      <ul className="space-y-4 p-4 sm:p-8">
        {entries.map((post: Post) => (
          <li key={post.id} className="p-4 flex justify-center">
            <div className="w-full shadow-md rounded-lg text-gray-700 sm:max-w-6xl p-4 sm:p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <h5 className="mb-2 text-xl sm:text-2xl font-bold tracking-tight text-gray-900 flex justify-end">
                {post.title}
              </h5>
              <p
                dir="rtl"
                className="mb-3 font-normal text-gray-700 dark:text-gray-400 truncate"
              >
                {post.content}
              </p>
              <p
                dir="rtl"
                className="mb-2 font-bold tracking-tight text-gray-900 flex justify-end"
              >
                <span>نویسنده: </span>
                {post.author}
              </p>
              <Link href={`/${post.id}`}
                dir="rtl"
                className="inline-flex items-center px-3 py-2 rounded-md bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              >
                بیشتر ...
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
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
