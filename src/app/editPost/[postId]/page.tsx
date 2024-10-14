"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchData } from "../../lib/api";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";

interface EditPostProps {
  params: {
    postId: string;
  };
}

export default function EditPost({ params }: EditPostProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await fetchData(
          `http://localhost:3001/posts/${params.postId}`
        );
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        console.error("خطا در دریافت داده‌ها:", error);
      }
    };
    loadPost();
  }, [params.postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/posts/${params.postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });
      if (response.ok) {
        router.push(`/${params.postId}`);
      } else {
        console.error("ویرایش پست ناموفق بود.");
      }
    } catch (error) {
      console.error("خطا در ویرایش پست:", error);
    }
  };

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
        {/* Title */}
        <Typography variant="h4" component="h1" fontWeight="bold" mb={4}>
          ویرایش پست
        </Typography>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Title Field */}
          <TextField
            label="عنوان"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            margin="normal"
            variant="outlined"
          />

          {/* Content Field */}
          <TextField
            label="محتوا"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            required
            margin="normal"
            multiline
            rows={6}
            variant="outlined"
          />

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 3 }}
          >
            ذخیره تغییرات
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
