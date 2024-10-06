"use client";
import { Post } from "../types";

interface PostListProps {
  currentPage: number;
  postsPerPage: number;
  filteredPosts: Post[];
}

const PostList: React.FC<PostListProps> = ({
  currentPage,
  postsPerPage,
  filteredPosts,
}) => {
  const page = currentPage;
  const per_page = postsPerPage;

  const start = (page - 1) * per_page;
  const end = start + per_page;

  const entries = filteredPosts.slice(start, end); // فیلتر کردن پست‌ها برای هر صفحه

  return (
    <ul className="space-y-4 p-4">
      {entries.map((post: Post) => (
        <li
          key={post.id}
          className="p-4 flex justify-center bg-white shadow-md rounded-lg text-gray-700"
        >
          <div className="max-w-6xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 flex justify-end">
                {post.title}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 truncate">
              {post.content}
            </p>
            <a
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
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
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
