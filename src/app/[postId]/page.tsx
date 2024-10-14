"use client";
import React, { useEffect, useState } from "react";
import { Post } from "../types";
import { fetchData } from "../lib/api";
import { Box, Paper, Typography, IconButton, Divider } from "@mui/material";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "grey.100",
        p: 3,
      }}
    >
      <Paper
        dir="rtl"
        sx={{
          maxWidth: "700px",
          width: "100%",
          p: 4,
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          {/* Edit Button */}
          <Link href={`/editPost/${params.postId}`}>
            <IconButton>
              <EditIcon fontSize="large" />
            </IconButton>
          </Link>

          {/* Title */}
          <Typography variant="h4" component="h1" fontWeight="bold">
            {post?.title}
          </Typography>

          {/* Back Button */}
          <Link href={`/`} dir="rtl">
            <IconButton>
              <ArrowBackIcon fontSize="large" />
            </IconButton>
          </Link>
        </Box>

        {/* Author */}
        <Typography variant="subtitle1" color="text.secondary" mb={2}>
          نویسنده: {post?.author}
        </Typography>

        {/* Date */}
        <Typography variant="body2" color="text.secondary" mb={2}>
          تاریخ: {post?.date}
        </Typography>

        {/* Content */}
        <Typography
          variant="body1"
          color="text.primary"
          sx={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}
        >
          {post?.content}
        </Typography>

        {/* Divider */}
        <Divider sx={{ my: 4 }} />
      </Paper>
    </Box>
  );
}
