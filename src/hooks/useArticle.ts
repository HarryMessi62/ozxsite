import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { articlesAPI, type Article } from '@/services/api';

export const useArticle = (slug: string) => {
  return useQuery<Article, Error>({
    queryKey: ['article', slug],
    queryFn: () => articlesAPI.getBySlug(slug),
    enabled: !!slug,
  });
};

// Хук для получения лайков статьи
export const useArticleLikes = (articleId: string, fingerprint?: string) => {
  return useQuery({
    queryKey: ['likes', articleId, fingerprint],
    queryFn: () => articlesAPI.getLikes(articleId, fingerprint),
    enabled: !!articleId && !!fingerprint,
  });
};

// Хук для переключения лайка
export const useToggleLike = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ articleId, fingerprint }: { articleId: string; fingerprint: string }) =>
      articlesAPI.toggleLike(articleId, fingerprint),
    onSuccess: (data, variables) => {
      // Обновляем кеш лайков
      queryClient.invalidateQueries({
        queryKey: ['likes', variables.articleId],
      });
      // Обновляем кеш статьи
      queryClient.invalidateQueries({
        queryKey: ['article', variables.articleId],
      });
    },
  });
}; 