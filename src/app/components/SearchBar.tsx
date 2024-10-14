"use client";

import { useState, useEffect } from "react";
import { Post } from "../types";
import { fetchData } from "../lib/api";
import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
interface SearchBarProps {
  setFilteredPosts: (posts: Post[]) => void;
  setIsLoading: (loading: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  setFilteredPosts,
  setIsLoading,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchData();
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error("خطا در دریافت داده‌ها:", error);
      } finally {
        setIsLoading(false); // خاتمه لودینگ
      }
    };

    loadData();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = posts.filter((post) => post.title.includes(query));
    setFilteredPosts(filtered);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
      <TextField
        dir="rtl"
        id="outlined-start-adornment"
        value={searchQuery}
        onInput={(e) => handleSearch(e.target.value)}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{ fill: "GrayText" }} />
            </InputAdornment>
          ),
        }}
        placeholder="جست و جو ..."
        size="small"
      />
    </Box>
  );
};

export default SearchBar;
