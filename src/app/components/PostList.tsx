"use client";
import React, { useEffect, useState } from "react";
import PaginationControls from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { Post } from "../types"; // Import Post type
import { fetchData } from "../lib/api";

export default function PostList({
  currentPage,
  postsPerPage,
}: {
  currentPage: number;
  postsPerPage: number;
}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  // استفاده از useEffect برای بارگیری داده‌ها
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData(); // صبر کردن برای دریافت داده‌ها
        setPosts(data);
        setFilteredPosts(data); // تنظیم داده‌های فیلتر شده به صورت پیش‌فرض
      } catch (error) {
        console.error("خطا در دریافت داده‌ها:", error);
      }
    };

    loadData();
  }, []); // تنها یک بار اجرا می‌شود، وقتی کامپوننت بارگذاری شد

  const page = currentPage;
  const per_page = postsPerPage;

  const start = (page - 1) * per_page;
  const end = start + per_page;

  const entries = filteredPosts.slice(start, end); // استفاده از filteredPosts برای صفحه‌بندی

  return (
    <div>
      {/* SearchBar برای فیلتر کردن پست‌ها */}
      <SearchBar posts={posts} setFilteredPosts={setFilteredPosts} />

      <ul className="space-y-4 p-4">
        {entries.map((post: Post) => (
          <li
            key={post.id}
            className="p-4 flex justify-center bg-white shadow-md rounded-lg text-gray-700"
          >
            <div class="max-w-6xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 flex justify-end">
                  {post.title}
                </h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 truncate">
                {post.content}
              </p>
              <a
                href="#"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Read more
                <svg
                  class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
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
              </a>
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
