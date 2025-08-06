'use client';

import React from 'react';
import Link from 'next/link';
import { type Article } from '@/services/api';
import ArticleCard from '@/components/ArticleCard';

interface RelatedArticlesProps {
  articles: Article[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Articles</h2>
          <p className="text-lg text-gray-600">
            You might also be interested in these articles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        <div className="text-center mt-12">
          <Link
            href="/articles"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
} 