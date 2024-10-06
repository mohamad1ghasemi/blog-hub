"use client";

import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalPosts: number;
  perPage: number;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
  totalPosts,
  perPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const totalPages = Math.ceil(totalPosts / perPage);

  return (
    <div className="flex justify-center gap-2">
      <button
        className="inline-flex items-center px-3 py-2 rounded-md bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/?page=${page - 1}&per_page=${perPage}`);
        }}
      >
        صفحه قبلی
      </button>

      <div className="font-semibold">
        {page} / {totalPages}
      </div>

      <button
        className="inline-flex items-center px-3 py-2 rounded-md bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/?page=${page + 1}&per_page=${perPage}`);
        }}
      >
        صفحه بعدی
      </button>
    </div>
  );
};

export default PaginationControls;
