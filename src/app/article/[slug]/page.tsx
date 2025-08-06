import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { articlesAPI } from '@/services/api';
import ArticleContent from './ArticleContent';
import RelatedArticles from './RelatedArticles';

type PageProps = {
  params: {
    slug: string;
  };
};

// Генерация метаданных для статьи
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  const article = await articlesAPI.getBySlug(slug).catch(() => null);
  
  if (!article) return {
    title: 'Article Not Found',
    description: 'The requested article could not be found.'
  };

  // Для спарсенных статей всегда ставим noindex
  const robotsMeta = article.isParsed ? 'noindex, nofollow' : 'index, follow';
  console.log('Article isParsed:', article.isParsed, 'Robots meta:', robotsMeta);

  return {
    title: article.title,
    description: article.excerpt || article.title,
    robots: robotsMeta,
    openGraph: {
      title: article.title,
      description: article.excerpt || article.title,
      images: article.media?.featuredImage ? [article.media.featuredImage.url] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt || article.title,
      images: article.media?.featuredImage ? [article.media.featuredImage.url] : [],
    }
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = params;
  const article = await articlesAPI.getBySlug(slug).catch(() => null);
  
  if (!article) notFound();

  const relatedResp = await articlesAPI.getArticles({ 
    category: article.category, 
    limit: 4,
    sortBy: 'publishedAt',
    sortOrder: 'desc'
  }).catch(() => ({ articles: [] }));
  
  const related = relatedResp.articles.filter(a => a._id !== article._id);

  return (
    <>
      <ArticleContent article={article} />
      <RelatedArticles articles={related} />
    </>
  );
} 