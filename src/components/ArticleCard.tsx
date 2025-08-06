import React from 'react';
import Link from 'next/link';
import { Calendar, Eye, ThumbsUp } from 'lucide-react';
import { Article } from '@/services/api';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'compact' | 'featured';
  showImage?: boolean;
  showStats?: boolean;
  showAuthor?: boolean;
  showCategory?: boolean;
}

export default function ArticleCard({
  article,
  variant = 'default',
  showImage = true,
  showStats = true,
  showAuthor = true,
  showCategory = true,
}: ArticleCardProps) {
  const {
    title,
    excerpt,
    slug,
    media,
    stats,
    author,
    category,
    publishedAt,
    isParsed
  } = article;

  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    return <Link href={`/article/${slug}`}>{children}</Link>;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (variant === 'compact') {
    return (
      <CardWrapper>
        <article className="group cursor-pointer">
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4 bg-gray-100">
            {showImage && media?.featuredImage && (
              <img
                src={media.featuredImage.url}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}
          </div>
          
          <div className="space-y-2">
            {showCategory && category && (
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded">
                {category}
              </span>
            )}
            
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
              {title}
            </h3>

            {showStats && (
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <time className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(publishedAt)}
                </time>
                {stats && (
                  <>
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {stats.views?.total || 0}
                    </span>
                    <span className="flex items-center">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {stats.likes?.total || 0}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        </article>
      </CardWrapper>
    );
  }

  return (
    <CardWrapper>
      <article className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
        {showImage && media?.featuredImage && (
          <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
            <img
              src={media.featuredImage.url}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <div className="p-6">
          {showCategory && category && (
            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded mb-4">
              {category}
            </span>
          )}
          
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
            {title}
          </h3>
          
          {excerpt && (
            <p className="text-gray-600 mb-4 line-clamp-2">{excerpt}</p>
          )}

          <div className="flex items-center justify-between">
            {showAuthor && author && (
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 mr-3">
                  {author.profile?.avatar ? (
                    <img
                      src={author.profile.avatar}
                      alt={author.username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 text-sm font-medium">
                      {author.username.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <span className="text-sm text-gray-600">{author.username}</span>
              </div>
            )}

            {showStats && stats && (
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <time className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(publishedAt)}
                </time>
                <span className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {stats.views?.total || 0}
                </span>
                <span className="flex items-center">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  {stats.likes?.total || 0}
                </span>
              </div>
            )}
          </div>
        </div>
      </article>
    </CardWrapper>
  );
} 