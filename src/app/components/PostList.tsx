"use client";

import React from "react";
import PaginationControls from "../components/Pagination";
import { Post } from "../types";
import Link from "next/link";
import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import LoadingScreen from "../loading";

interface PostListProps {
  currentPage: number;
  postsPerPage: number;
  filteredPosts: Post[];
  isLoading: boolean;
}

export default function PostList({
  currentPage,
  postsPerPage,
  filteredPosts,
  isLoading,
}: PostListProps) {
  const page = currentPage;
  const per_page = postsPerPage;

  const start = (page - 1) * per_page;
  const end = start + per_page;

  const entries = filteredPosts.slice(start, end);

  return (
    <Box sx={{ width: "100%", px: { xs: 2, sm: 4 } }}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Box component="ul" sx={{ p: { xs: 2, sm: 4 }, listStyle: "none" }}>
          {entries.map((post: Post) => (
            <Box component="li" key={post.id} sx={{ p: 2, display: "flex", justifyContent: "center" }}>
              <Card sx={{ width: "100%", maxWidth: "800px", boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h5" component="div" textAlign="right" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" textAlign="right" dir="rtl" noWrap>
                    {post.content}
                  </Typography>
                  <Typography variant="subtitle1" textAlign="right" dir="rtl" fontWeight="bold">
                    نویسنده: {post.author}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    component={Link} 
                    href={`/${post.id}`} 
                    endIcon={
                      <svg
                        className="rtl:rotate-180"
                        width="14"
                        height="10"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    }
                  >
                    بیشتر ...
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
      )}
      <PaginationControls
        totalPosts={filteredPosts.length}
        perPage={per_page}
      />
    </Box>
  );
}
