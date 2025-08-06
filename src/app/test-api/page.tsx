'use client';

import { useState, useEffect } from 'react';
import { api } from '@/services/api';

export default function TestApiPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const testConnection = async () => {
      try {
        setStatus('loading');
        const response = await api.get('/articles');
        setData(response.data);
        setStatus('success');
      } catch (err: any) {
        setError(err.message || 'Ошибка подключения');
        setStatus('error');
      }
    };

    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Тест подключения к API
        </h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <span className="text-sm font-medium text-gray-500">
              Статус подключения:
            </span>
            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
              status === 'loading' ? 'bg-yellow-100 text-yellow-800' :
              status === 'success' ? 'bg-green-100 text-green-800' :
              'bg-red-100 text-red-800'
            }`}>
              {status === 'loading' ? 'Загрузка...' :
               status === 'success' ? 'Успешно' :
               'Ошибка'}
            </span>
          </div>
          
          <div className="mb-4">
            <span className="text-sm font-medium text-gray-500">
              URL API:
            </span>
            <span className="ml-2 text-sm text-gray-900">
              http://localhost:3001/api/articles
            </span>
          </div>
          
          {status === 'error' && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="text-sm font-medium text-red-800 mb-2">
                Ошибка подключения:
              </h3>
              <p className="text-sm text-red-700">{error}</p>
              <p className="text-sm text-red-600 mt-2">
                Убедитесь, что сервер запущен на порту 3001
              </p>
            </div>
          )}
          
          {status === 'success' && data && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-sm font-medium text-green-800 mb-2">
                Данные получены успешно:
              </h3>
              <p className="text-sm text-green-700">
                Найдено статей: {data.articles?.length || data.length || 0}
              </p>
              <details className="mt-2">
                <summary className="text-sm text-green-600 cursor-pointer">
                  Показать данные
                </summary>
                <pre className="mt-2 text-xs text-green-800 bg-green-100 p-2 rounded overflow-auto">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </details>
            </div>
          )}
          
          <div className="text-sm text-gray-600">
            <p className="mb-2">
              <strong>Инструкции:</strong>
            </p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Убедитесь, что сервер newsBack запущен</li>
              <li>Сервер должен работать на порту 3001</li>
              <li>API должен быть доступен по адресу /api/articles</li>
              <li>Если сервер недоступен, приложение будет использовать моковые данные</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
} 