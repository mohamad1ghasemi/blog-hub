"use client";
import React, { useEffect, useState } from "react";
import { Post } from "../types";
import { fetchData } from "../lib/api";
import Link from "next/link";

interface PostDetailsProps {
  params: {
    postId: string;
  };
}

export default function PostDetails({ params }: PostDetailsProps) {
  const [post, setPost] = useState<Post | null>();
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData(
          `http://localhost:3001/posts/${params.postId}`
        );
        setPost(data);
      } catch (error) {
        console.error("خطا در دریافت داده‌ها:", error);
      }
    };
    loadData();
  }, [params.postId]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div
        dir="rtl"
        className="max-w-6xl min-w-96 min-h-52 mx-auto p-6 bg-white rounded-lg shadow-md"
      >
        <div className="flex items-center justify-between mb-2">
        <Link href={`/editPost/${params.postId}`}>
          <span>
            <svg
              width="32px"
              height="32px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 9.00006H6.2C5.0799 9.00006 4.51984 9.00006 4.09202 9.21805C3.71569 9.40979 3.40973 9.71575 3.21799 10.0921C3 10.5199 3 11.08 3 12.2001V17.8001C3 18.9202 3 19.4802 3.21799 19.908C3.40973 20.2844 3.71569 20.5903 4.09202 20.7821C4.51984 21.0001 5.07989 21.0001 6.2 21.0001H17.787C18.9071 21.0001 19.4671 21.0001 19.895 20.7821C20.2713 20.5903 20.5772 20.2844 20.769 19.908C20.987 19.4802 20.987 18.9202 20.987 17.8001V12.0001M6 15.0001H6.01M10 15H10.01M11.5189 12.8946L12.8337 12.6347C13.5432 12.4945 13.8979 12.4244 14.2287 12.2953C14.5223 12.1807 14.8013 12.0318 15.06 11.8516C15.3514 11.6487 15.607 11.393 16.1184 10.8816L21.2668 5.73321C21.9541 5.04596 21.9541 3.9317 21.2668 3.24444C20.5796 2.55719 19.4653 2.55719 18.7781 3.24445L13.5416 8.48088C13.0625 8.96004 12.8229 9.19963 12.6294 9.47121C12.4576 9.71232 12.3131 9.97174 12.1986 10.2447C12.0696 10.5522 11.9921 10.8821 11.837 11.5417L11.5189 12.8946Z"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          </Link>
          <h1 className="text-3xl font-bold">{post?.title}</h1>
          <Link href={`/`} dir="rtl" className="text-gray-800">
            <svg
              className=" w-7 h-7 ms-2"
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
        <p className="text-gray-600 mb-4">نویسنده: {post?.author}</p>
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
          {post?.content}
        </p>
      </div>
    </div>
  );
}
