import React from 'react';
import { articlesAPI } from '@/services/api';
import ArticleCard from '@/components/ArticleCard';
import ArticleFilters from './ArticleFilters';

export const revalidate = 600; // ISR: 10 minutes

interface PageProps {
  searchParams: {
    page?: string;
    category?: string;
    search?: string;
    sortBy?: string;
  };
}

export default async function ArticlesPage({ searchParams }: PageProps) {
  const page = Number(searchParams.page) || 1;
  const category = searchParams.category;
  const search = searchParams.search;
  const sortBy = searchParams.sortBy as 'publishedAt' | 'views' | 'likes' | undefined;

  // TODO: Add backend support for prioritizing non-parsed articles (isParsed: false)
  // This would require API changes to maintain proper pagination
  const { articles, totalPages } = await articlesAPI.getArticles({
    page,
    limit: 12,
    category,
    search,
    sortBy,
    sortOrder: 'desc'
  }).catch(() => ({ articles: [], totalPages: 0, totalCount: 0 }));

  return (
    <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Latest Articles</h1>
          <p className="text-lg text-gray-600">
            Stay updated with the latest news and insights from the crypto world
          </p>
        </div>

        <ArticleFilters
          currentCategory={category}
          currentSort={sortBy}
          currentSearch={search}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {articles.map((article) => (
                  <ArticleCard 
                    key={article._id} 
                    article={article}
              variant="default"
                    showImage={true}
                    showStats={true}
                    showAuthor={true}
                    showCategory={true}
                  />
                ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <nav className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <a
                  key={i}
                  href={`/articles?page=${i + 1}${category ? `&category=${category}` : ''}${search ? `&search=${search}` : ''}${sortBy ? `&sortBy=${sortBy}` : ''}`}
                  className={`px-4 py-2 rounded-lg ${
                    page === i + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
} 