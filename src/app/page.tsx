import React from 'react';
import Link from 'next/link';
import { TrendingUp, Shield, Zap, Users, ArrowRight, Mail, ChevronRight } from 'lucide-react';
import ArticleCard from '@/components/ArticleCard';
import { articlesAPI } from '@/services/api';

export const revalidate = 600;

export const metadata = {
  title: 'CryptoLight – Cryptocurrency News and Analysis',
  description: 'Get the latest information about cryptocurrencies, blockchain technology, and digital assets from leading industry experts.',
};

export default async function HomePage() {
  const [featuredArticles, latestArticles] = await Promise.all([
    articlesAPI.getFeatured(15), // Увеличиваем лимит для большего выбора
    articlesAPI.getLatest(80)    // Увеличиваем лимит для большего выбора
  ]).catch(() => [[], []]);

  // Prioritize non-parsed articles first, then by date
  const featuredPrioritized = featuredArticles
    .sort((a, b) => {
      // First priority: non-parsed articles (isParsed = false)
      if (!a.isParsed && b.isParsed) return -1;
      if (a.isParsed && !b.isParsed) return 1;
      
      // Second priority: sort by published date (newest first)
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

  const latestPrioritized = latestArticles
    .sort((a, b) => {
      // First priority: non-parsed articles (isParsed = false)
      if (!a.isParsed && b.isParsed) return -1;
      if (a.isParsed && !b.isParsed) return 1;
      
      // Second priority: sort by published date (newest first)
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

  // Специальная логика для больших статей: 2 не спаршенные + 1 спаршенная
  const nonParsedFeatured = featuredPrioritized.filter(article => !article.isParsed);
  const parsedFeatured = featuredPrioritized.filter(article => article.isParsed);
  
  const heroArticles = [
    ...nonParsedFeatured.slice(0, 2), // Берем первые 2 не спаршенные
    ...parsedFeatured.slice(0, 1)     // Берем первую спаршенную
  ];
  
  // Если не хватает статей, дополняем остальными
  while (heroArticles.length < 3 && featuredPrioritized.length > heroArticles.length) {
    const nextArticle = featuredPrioritized.find(article => 
      !heroArticles.some(hero => hero._id === article._id)
    );
    if (nextArticle) heroArticles.push(nextArticle);
  }
  
  const mainArticle = heroArticles[0];
  const secondaryFeatured = heroArticles.slice(1, 3);
  const otherFeatured = featuredPrioritized.slice(3, 7);
  const latestNews = latestPrioritized.slice(0, 6);

  return (
    <div className="min-h-screen bg-white">
      {/* Site Intro Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              <span className="text-blue-600">Crypto</span>Light
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your trusted source for cryptocurrency news, analysis, and insights. Stay informed about the latest developments in the digital asset space.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">21M</div>
              <div className="text-sm text-gray-600">Maximum Bitcoin Supply</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-sm text-gray-600">Active Cryptocurrencies</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600">Market Trading</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">$2T+</div>
              <div className="text-sm text-gray-600">Market Cap Record</div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section with Featured Articles */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            {/* Main Featured Article */}
            {mainArticle && (
              <div className="lg:col-span-8 relative">
                <Link href={`/article/${mainArticle.slug}`}>
                  <div className="group relative rounded-2xl overflow-hidden aspect-[16/9]">
                    {mainArticle.media?.featuredImage && (
                      <img
                        src={mainArticle.media.featuredImage.url}
                        alt={mainArticle.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                            {mainArticle.category}
                          </span>
                          <span className="text-white/80 text-sm">
                            {new Date(mainArticle.publishedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                          {mainArticle.title}
                        </h2>
                        <p className="text-white/80 line-clamp-2">{mainArticle.excerpt}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Secondary Featured Articles */}
            <div className="lg:col-span-4 space-y-6">
              {secondaryFeatured.map((article) => (
                <Link key={article._id} href={`/article/${article.slug}`}>
                  <div className="group relative rounded-xl overflow-hidden aspect-[16/9]">
                    {article.media?.featuredImage && (
                      <img
                        src={article.media.featuredImage.url}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <span className="inline-block px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full mb-2">
                          {article.category}
                        </span>
                        <h3 className="text-lg font-bold text-white line-clamp-2 group-hover:text-blue-400 transition-colors">
                          {article.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Latest News and Featured Stories */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Latest News */}
            <div className="lg:col-span-4">
              <div className="bg-gray-50 rounded-2xl">
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900">Latest News</h2>
                  <Link 
                    href="/articles" 
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                  >
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
                <div className="divide-y divide-gray-100">
                  {latestNews.map((article) => (
                    <Link key={article._id} href={`/article/${article.slug}`}>
                      <div className="group cursor-pointer flex items-start gap-3 p-4 hover:bg-gray-100/50 transition-colors">
                        <div className="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden bg-gray-200">
                          {article.media?.featuredImage ? (
                            <img 
                              src={article.media.featuredImage.url} 
                              alt={article.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600">
                              <TrendingUp className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <div>
                          <time className="text-xs text-gray-500 mb-1 block">
                            {new Date(article.publishedAt).toLocaleDateString()}
                          </time>
                          <h3 className="text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm font-medium">
                            {article.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Featured Stories */}
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Featured Stories</h2>
                <Link 
                  href="/articles" 
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                >
                  View All Articles
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otherFeatured.map((article) => (
                  <ArticleCard
                    key={article._id}
                    article={article}
                    variant="compact"
                    showImage={true}
                    showStats={true}
                    showAuthor={true}
                    showCategory={true}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose CryptoLight
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay informed with the latest cryptocurrency news and analysis from trusted experts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-Time Updates</h3>
              <p className="text-gray-600">
                Get instant access to breaking news and market movements in the crypto world
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Expert Analysis</h3>
              <p className="text-gray-600">
                In-depth analysis and insights from cryptocurrency industry experts
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Driven</h3>
              <p className="text-gray-600">
                Join our growing community of crypto enthusiasts and stay connected
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-2xl p-8 md:p-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Stay Updated
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter for weekly curated crypto news and analysis
              </p>
              
              <form className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 