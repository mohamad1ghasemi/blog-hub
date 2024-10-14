"use client";

import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@mui/material";

interface PaginationControlsProps {
  totalPosts: number;
  perPage: number;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  totalPosts,
  perPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();


  const page = Number(searchParams.get("page")) || 1;
  const totalPages = Math.ceil(totalPosts / perPage);


  const handleChange = (_: any, value: number) => {
    router.push(`/?page=${value}&per_page=${perPage}`);
  };

  return (
    <div className="flex justify-center gap-2">
      <Pagination
        page={page}
        count={totalPages}
        color="primary"
        onChange={handleChange}
      />
    </div>
  );
};

export default PaginationControls;
