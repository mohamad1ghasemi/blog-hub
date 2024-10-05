import React from "react";
import PostList from "./components/PostList";

export default async function Postspage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const currentPage = Number(searchParams.page) || 1; // از searchParams برای تعیین currentPage استفاده کنید
  const postsPerPage = 10; // تعداد پست‌ها در هر صفحه

  return (
    <>
      <PostList currentPage={currentPage} postsPerPage={postsPerPage} searchParams={searchParams} />
    </>
  );
}
