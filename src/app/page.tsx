import React from "react";
import PostList from "./components/PostList";


export default async function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const currentPage = Number(searchParams.page) || 1; // از searchParams برای تعیین currentPage استفاده کنید
  const postsPerPage = 8; // تعداد پست‌ها در هر صفحه

  return (
    <div className="flex ">
      <PostList currentPage={currentPage} postsPerPage={postsPerPage} />
    </div>
  );
}
