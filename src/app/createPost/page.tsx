"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          author,
          genre,
        }),
      });
      if (response.ok) {
        router.push("/");
      } else {
        console.error("ایجاد پست ناموفق بود.");
      }
    } catch (error) {
      console.error("خطا در ایجاد پست:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen min-w-full bg-gray-100">
      <div
        dir="rtl"
        className="max-w-7xl min-w-96 min-h-[120px] mx-auto p-6 bg-white rounded-lg shadow-md"
      >
        <h1 className="text-3xl font-bold mb-4">ایجاد پست جدید</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              عنوان
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              محتوا
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows={6}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              نویسنده
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              ژانر
            </label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <button
            className="inline-flex items-center px-3 py-2 rounded-md bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            type="submit"
          >
            ذخیره پست
          </button>
        </form>
      </div>
    </div>
  );
}
