'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, Eye, Heart, ChevronRight } from 'lucide-react';
import { type Article, articlesAPI } from '@/services/api';
import { getUserFingerprint } from '@/utils/browserFingerprint';
import { useArticleLikes, useToggleLike } from '@/hooks/useArticle';

interface ArticleContentProps {
  article: Article;
}

export default function ArticleContent({ article }: ArticleContentProps) {
  const [fingerprint, setFingerprint] = useState('');

  useEffect(() => {
    // Increment views on mount
    if (article._id) {
      articlesAPI.incrementViews(article._id).catch(() => {});
    }
    // Get user fingerprint
    setFingerprint(getUserFingerprint());
  }, [article._id]);

  const { data: likesData } = useArticleLikes(article._id, fingerprint);
  const toggleLike = useToggleLike();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleLike = async () => {
    if (!article._id || !fingerprint) return;
    await toggleLike.mutateAsync({ articleId: article._id, fingerprint });
  };

  const likes = likesData?.stats?.total ?? article.stats?.likes.total ?? 0;
  const userLiked = likesData?.userLiked ?? false;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/articles" className="hover:text-gray-900">Articles</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{article.title}</span>
          </nav>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full">
              {article.category}
            </span>
            <time className="text-sm text-gray-500" dateTime={article.publishedAt}>
              {formatDate(article.publishedAt)}
            </time>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-6">{article.title}</h1>
          
          {article.excerpt && (
            <p className="text-xl text-gray-500 leading-relaxed">{article.excerpt}</p>
          )}
        </header>

        {/* Featured Image */}
        {article.media?.featuredImage && (
          <div className="mb-12">
        <img
          src={article.media.featuredImage.url}
          alt={article.media.featuredImage.alt || article.title}
              className="w-full h-auto rounded-lg shadow-lg"
        />
          </div>
      )}

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }} 
        />

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                disabled={!fingerprint || toggleLike.isPending}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  userLiked 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                <Heart className={`w-5 h-5 ${userLiked ? 'fill-current' : ''}`} />
                <span>{likes}</span>
              </button>
            </div>

            <div className="flex items-center gap-4">
              {article.tags?.map(tag => (
                <Link
                  key={tag}
                  href={`/articles?tag=${tag}`}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </footer>
    </article>
    </div>
  );
} 