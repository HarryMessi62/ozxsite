import axios from 'axios';

// Создаем экземпляр axios с базовой конфигурацией
export const api = axios.create({
  baseURL: 'https://ozx.info/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-Domain-Context': 'ozxinfo', // Идентификатор домена для ozx.info
  },
});

// Интерфейсы для типизации
export interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  isParsed: boolean;
  author: {
    _id: string;
    username: string;
    profile?: {
      firstName?: string;
      lastName?: string;
      avatar?: string;
    };
  };
  domain: {
    _id: string;
    name: string;
    url: string;
  };
  publishedAt: string;
  stats: {
    views: { total: number };
    likes: { total: number };
    shares: { total: number };
    comments: { total: number };
  };
  media?: {
    featuredImage?: {
      url: string;
      alt: string;
    };
  };
}

interface ArticlesResponse {
  articles: Article[];
  totalCount: number;
  totalPages: number;
}

// API методы
export const articlesAPI = {
  // Get all articles with filters
  getArticles: async ({
    page = 1,
    limit = 10,
    category,
    search,
    sortBy = 'publishedAt',
    sortOrder = 'desc'
  }: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}): Promise<ArticlesResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sortBy,
      sortOrder,
    });

    if (category) params.append('category', category);
    if (search) params.append('search', search);

    const response = await api.get(`/articles?${params}`);
    return response.data;
  },

  // Get article by ID
  getArticleById: async (id: string): Promise<Article> => {
    const response = await api.get(`/articles/id/${id}`);
    return response.data.data.article;
  },

  // Get article by slug
  getBySlug: async (slug: string): Promise<Article> => {
    const response = await api.get(`/articles/${slug}`);
    return response.data.data.article;
  },

  // Get featured articles
  getFeatured: async (limit: number = 6): Promise<Article[]> => {
    const response = await api.get('/articles/featured', { params: { limit } });
    return response.data;
  },

  // Get popular articles
  getPopular: async (limit: number = 10): Promise<Article[]> => {
    const response = await api.get('/articles/popular', { params: { limit } });
    return response.data;
  },

  // Get latest articles
  getLatest: async (limit: number = 10): Promise<Article[]> => {
    const response = await api.get('/articles/latest', { params: { limit } });
    return response.data;
  },

  // Get articles by category
  getArticlesByCategory: async (category: string, page: number = 1, limit: number = 10): Promise<ArticlesResponse> => {
    const response = await api.get('/articles', { 
      params: { category, page, limit, sortBy: 'publishedAt', sortOrder: 'desc' } 
    });
    return response.data;
  },

  // Increment views
  incrementViews: async (articleId: string): Promise<void> => {
    await api.post(`/articles/id/${articleId}/view`);
  },

  // Toggle like
  toggleLike: async (articleId: string, fingerprint: string): Promise<{ liked: boolean; totalLikes: number }> => {
    const response = await api.post(`/likes/article/${articleId}/toggle`, { fingerprint });
    return response.data;
  },

  // Share article
  share: async (articleId: string): Promise<void> => {
    await api.post(`/articles/id/${articleId}/share`);
  },

  // Get article likes
  getLikes: async (articleId: string, fingerprint?: string): Promise<{ stats: { total: number }, userLiked: boolean }> => {
    const params = fingerprint ? `?fingerprint=${fingerprint}` : '';
    const response = await api.get(`/likes/article/${articleId}${params}`);
    return response.data;
  },

  // Get article comments
  getComments: async (articleId: string): Promise<{ comments: any[] }> => {
    const response = await api.get(`/articles/id/${articleId}/comments`);
    return response.data;
  },

  // Add comment
  addComment: async (articleId: string, comment: { content: string; author: string; email?: string; fingerprint: string }) => {
    const response = await api.post(`/articles/id/${articleId}/comments`, comment);
    return response.data;
  },

  // Search articles
  search: async (query: string, filters?: {
    category?: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<Article[]> => {
    const response = await api.get('/articles/search', { 
      params: { query, ...filters } 
    });
    return response.data;
  },
};

// Интерсепторы для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 404) {
      console.error('Resource not found');
    } else if (error.response?.status === 500) {
      console.error('Internal server error');
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    }
    return Promise.reject(error);
  }
);

export default api; 