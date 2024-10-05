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
      post.title.includes(query.toLowerCase())
    );
    setFilteredPosts(filtered); // Update the filtered posts in the parent component
  };

  return (
    <form class="max-w-xl p-16 mx-auto">   
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="text" id='default-search' value={searchQuery}  className="focus:outline-none focus:ring-0 focus:border-transparent block font-extrabold w-full p-6 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" placeholder="Search . . ." onChange={(e) => handleSearch(e.target.value)} />
    </div>
</form>
  );
};

export default SearchBar;
