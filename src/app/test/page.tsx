export default function TestPage() {
  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Тест Tailwind CSS
        </h1>
        <p className="text-gray-600 mb-4">
          Если вы видите синий фон и белую карточку, то Tailwind CSS работает!
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
          Кнопка
        </button>
      </div>
    </div>
  );
} 