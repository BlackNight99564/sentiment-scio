import React from 'react';
import { Input } from '../components/ui/input';

const SearchBar = ({ onSearch }) => {
  return (
    <div className="mb-4">
      <Input
        type="text"
        placeholder="Search posts..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full"
      />
    </div>
  );
};

export default SearchBar;