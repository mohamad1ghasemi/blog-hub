// components/Comments.tsx
"use client";
import React, { useEffect, useState } from "react";

interface Comment {
  id: number;
  author: string;
  content: string;
}

interface CommentsProps {
  postId: string;
}

export default function Comments({ postId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({ author: "", content: "" });

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:3001/posts/${postId}/comments`);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("خطا در دریافت کامنت‌ها:", error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });
      if (response.ok) {
        const addedComment = await response.json();
        setComments((prev) => [...prev, addedComment]);
        setNewComment({ author: "", content: "" }); // Reset the input fields
      } else {
        console.error("ایجاد کامنت ناموفق بود.");
      }
    } catch (error) {
      console.error("خطا در ایجاد کامنت:", error);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">کامنت‌ها</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="نام شما"
          value={newComment.author}
          onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
          className="border border-gray-300 p-2 w-full mb-2"
          required
        />
        <textarea
          placeholder="کامنت خود را بنویسید..."
          value={newComment.content}
          onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
          className="border border-gray-300 p-2 w-full mb-2"
          required
        />
        <button
            className="inline-flex items-center px-3 py-2 rounded-md bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            type="submit"
          >
          ارسال کامنت
        </button>
      </form>

      {comments && comments.length > 0 ? ( 
  <ul>
    {comments.map((comment) => (
      <li key={comment.id} className="border-b border-gray-300 pb-2 mb-2">
        <h3 className="font-semibold">{comment.author}</h3>
        <p>{comment.content}</p>
      </li>
    ))}
  </ul>
) : (
  <p className="text-gray-500">کامنتی وجود ندارد.</p>
)}
    </div>
  );
}
