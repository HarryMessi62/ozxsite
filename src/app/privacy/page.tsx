import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности – OZX.Info',
  description: 'Как OZX.Info обрабатывает персональные данные и куки',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Политика конфиденциальности</h1>
        <p className="text-gray-700 mb-4">
          OZX.Info уважает вашу конфиденциальность и обязуется защищать персональные данные пользователей.
        </p>
        <p className="text-gray-700 mb-4">
          Мы собираем минимальный объём данных, необходимый для анализа посещаемости сайта и улучшения контента.
        </p>
        <p className="text-gray-700 mb-4">
          Используя наш сайт, вы соглашаетесь с использованием файлов cookie. Вы можете изменить настройки браузера, чтобы отказаться от их использования.
        </p>
        <p className="text-gray-700">
          По любым вопросам, связанным с персональными данными, обращайтесь по адресу: privacy@ozx.info
        </p>
      </div>
    </div>
  );
} 