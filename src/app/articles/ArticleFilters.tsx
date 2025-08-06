'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, ChevronDown } from 'lucide-react';

interface ArticleFiltersProps {
  currentCategory?: string;
  currentSort?: string;
  currentSearch?: string;
}

const categories = [
  'All Categories',
  'Bitcoin',
  'Ethereum',
  'Crypto',
  'Technology',
  'Economy',
  'Politics',
  'Business'
];

const sortOptions = [
  { value: 'publishedAt', label: 'Latest' },
  { value: 'views', label: 'Most Viewed' },
  { value: 'likes', label: 'Most Liked' }
];

export default function ArticleFilters({ currentCategory, currentSort, currentSearch }: ArticleFiltersProps) {
  const router = useRouter();
  const [showCategories, setShowCategories] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [searchQuery, setSearchQuery] = useState(currentSearch || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search: searchQuery });
  };

  const updateFilters = (updates: { category?: string; sort?: string; search?: string }) => {
    const params = new URLSearchParams();
  
    const isDefaultCategory = updates.category === '' || updates.category === undefined;
    const isDefaultSort = !updates.sort && !currentSort;
    const isDefaultSearch = !updates.search && !searchQuery;
  
    if (isDefaultCategory && isDefaultSort && isDefaultSearch) {
      router.push('/articles');
      return;
    }
  
    if (updates.category !== undefined) {
      if (updates.category) params.set('category', updates.category);
    } else if (currentCategory) {
      params.set('category', currentCategory);
    }
  
    if (updates.sort !== undefined) {
      if (updates.sort) params.set('sortBy', updates.sort);
    } else if (currentSort) {
      params.set('sortBy', currentSort);
    }
  
    if (updates.search !== undefined) {
      if (updates.search) params.set('search', updates.search);
    } else if (searchQuery) {
      params.set('search', searchQuery);
    }
  
    router.push(`/articles?${params.toString()}`);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex-1 max-w-md w-full">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </form>

      {/* Filters */}
      <div className="flex items-center gap-4 w-full lg:w-auto">
        {/* Category Filter */}
        <div className="relative flex-1 lg:flex-none">
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="w-full lg:w-auto flex items-center justify-between gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span className="truncate">{currentCategory || 'All Categories'}</span>
            </div>
            <ChevronDown className="w-4 h-4 flex-shrink-0" />
          </button>
          
          {showCategories && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    updateFilters({ category: category === 'All Categories' ? '' : category });
                    setShowCategories(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                    (currentCategory === category || (!currentCategory && category === 'All Categories'))
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sort Filter */}
        {/* <div className="relative flex-1 lg:flex-none">
          <button
            onClick={() => setShowSort(!showSort)}
            className="w-full lg:w-auto flex items-center justify-between gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span className="truncate">
                {sortOptions.find(opt => opt.value === currentSort)?.label || 'Sort By'}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 flex-shrink-0" />
          </button> */}
          
          {/* {showSort && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    updateFilters({ sort: option.value });
                    setShowSort(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                    currentSort === option.value
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )} */}
        {/* </div> */}
      </div>
    </div>
  );
}