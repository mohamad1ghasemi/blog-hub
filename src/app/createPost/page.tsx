"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          author,
          genre,
        }),
      });

      if (response.ok) {
        const newPost = await response.json();
        const newPageId = newPost.id;
        router.push(`/${newPageId}`);
      } else {
        console.error("ایجاد پست ناموفق بود.");
      }
    } catch (error) {
      console.error("خطا در ایجاد پست:", error);
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
    }}
  >
    <Paper
      elevation={3}
      sx={{
        maxWidth: "700px",
        width: "100%",
        p: 4,
        bgcolor: "white",
        borderRadius: 2,
      }}
    >
      <Box dir="rtl">
        <Typography variant="h4" component="h1" gutterBottom>
          ایجاد پست جدید
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <TextField
              label="عنوان"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="محتوا"
              multiline
              rows={6}
              fullWidth
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="نویسنده"
              fullWidth
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </Box>
          <Box mb={3}>
            <TextField
              label="ژانر"
              fullWidth
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
          </Box>
          <Button variant="contained" color="primary" type="submit">
            ذخیره پست
          </Button>
        </form>
      </Box>
    </Paper>
  </Box>
  );
}
