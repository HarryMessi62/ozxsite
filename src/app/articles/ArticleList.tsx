'use client';

import React, { useState } from 'react';
import ArticleCard from '@/components/ArticleCard';
import { type Article } from '@/services/api';
import { Grid, List } from 'lucide-react';

interface ArticleListProps {
  articles: Article[];
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">
          No articles found
        </p>
        <a href="/articles" className="text-blue-600 hover:text-blue-700 font-medium">
          Reset filters
        </a>
      </div>
    );
  }

  return (
    <>
      {/* View Mode Toggle */}
      <div className="flex justify-end mb-4">
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 transition-colors ${
              viewMode === 'grid' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 transition-colors ${
              viewMode === 'list' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Articles Grid/List */}
      <div className={`${
        viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
          : 'space-y-4'
      }`}>
        {articles.map((article) => (
          <ArticleCard 
            key={article._id} 
            article={article}
            variant={viewMode === 'list' ? 'compact' : 'default'}
            showImage={true}
            showStats={true}
            showAuthor={true}
            showCategory={true}
          />
        ))}
      </div>
    </>
  );
};

export default ArticleList;