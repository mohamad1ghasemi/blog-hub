import React from "react";
import PostList from "./components/PostList";


export default async function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const currentPage = Number(searchParams.page) || 1; // از searchParams برای تعیین currentPage استفاده کنید
  const postsPerPage = 5; // تعداد پست‌ها در هر صفحه

  return (
    <>
      <PostList currentPage={currentPage} postsPerPage={postsPerPage} />
    </>
  );
}
