"use client";
import { useEffect, useState } from "react";
import PostList from "./components/PostList";
import SearchBar from "./components/SearchBar";
import { Post } from "./types";
import { fetchData } from "./lib/api";

export default function PostPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]); // پست‌های فیلتر شده
  const currentPage = 1; // این متغیر را بر اساس نیاز می‌توان تغییر داد
  const postsPerPage = 10;

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchData();
      setPosts(data);
      setFilteredPosts(data); // تنظیم پست‌های فیلتر شده به داده‌های اصلی
    };

    loadPosts();
  }, []);

  return (
    <div>
      <SearchBar posts={posts} setFilteredPosts={setFilteredPosts} /> {/* ارتباط بین دو کامپوننت */}

      <PostList
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        filteredPosts={filteredPosts} // ارسال پست‌های فیلتر شده به PostList
      />
    </div>
  );
}
