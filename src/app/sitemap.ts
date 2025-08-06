import { articlesAPI } from '@/services/api';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const staticPages = ['', '/articles', '/about', '/contacts', '/privacy', '/stats'];

  const articleResp = await articlesAPI.getArticles({ limit: 100 });
  const articleUrls = articleResp.articles.map((a) => ({
    url: `${baseUrl}/article/${a.slug}`,
    lastModified: a.publishedAt,
  }));

  const urls = [
    ...staticPages.map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date().toISOString() })),
    ...articleUrls,
  ];

  return urls;
} 