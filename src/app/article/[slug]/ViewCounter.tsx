'use client';

import { useEffect } from 'react';
import { articlesAPI } from '@/services/api';

interface ViewCounterProps {
  slug: string;
}

export default function ViewCounter({ slug }: ViewCounterProps) {
  useEffect(() => {
    // Increment views when component mounts
    if (slug) {
      articlesAPI.incrementViews(slug).catch(() => {});
    }
  }, [slug]);

  // This component doesn't render anything
  return null;
}