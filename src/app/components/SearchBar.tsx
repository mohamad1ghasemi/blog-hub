// SearchBar.tsx
"use client";

import { useState } from 'react';
import { Post } from '../types'; // Import Post type

interface SearchBarProps {
  posts: Post[];
  setFilteredPosts: (posts: Post[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ posts, setFilteredPosts }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered); // Update the filtered posts in the parent component
  };

  return (
    <div className="w-full h-[80px] flex justify-center items-center">
      <input
        type="text"
        placeholder="Search posts..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-[60%] h-[40px] bg-purple-400 border-purple-400 border-2 rounded-md placeholder:text-gray-500"
      />
    </div>
  );
};

export default SearchBar;
