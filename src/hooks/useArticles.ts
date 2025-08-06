import { useQuery } from '@tanstack/react-query';
import { articlesAPI, type Article } from '@/services/api';

interface UseArticlesParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}

export const useArticles = (params: UseArticlesParams = {}) => {
  const { page = 1, limit = 10, category, search } = params;

  const query = useQuery({
    queryKey: ['articles', page, limit, category, search],
    queryFn: () => articlesAPI.getArticles({ page, limit, category, search }),
  });

  return {
    articles: query.data?.articles || [],
    totalCount: query.data?.totalCount ?? 0,
    loading: query.isLoading,
    error: query.error ? 'Ошибка загрузки статей' : null,
    refetch: query.refetch,
  };
}; 