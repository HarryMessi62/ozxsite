'use client';

import { useState } from 'react';
import { Eye, Users, Clock, TrendingUp, BarChart } from 'lucide-react';

export default function StatsPage() {
  const [timeRange, setTimeRange] = useState('7d');

  // Моковые данные
  const stats = {
    totalViews: 45623,
    uniqueVisitors: 12453,
    avgSessionTime: '3м 24с',
    bounceRate: '42.3%',
    dailyViews: [
      { date: '2024-12-01', views: 3250 },
      { date: '2024-12-02', views: 3890 },
      { date: '2024-12-03', views: 4120 },
      { date: '2024-12-04', views: 3675 },
      { date: '2024-12-05', views: 4456 },
      { date: '2024-12-06', views: 5123 },
      { date: '2024-12-07', views: 4987 },
    ],
  };

  const overviewCards = [
    { title: 'Всего просмотров', value: stats.totalViews.toLocaleString(), icon: Eye },
    { title: 'Уникальные посетители', value: stats.uniqueVisitors.toLocaleString(), icon: Users },
    { title: 'Среднее время сессии', value: stats.avgSessionTime, icon: Clock },
    { title: 'Bounce Rate', value: stats.bounceRate, icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-900">Аналитика сайта</h1>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="24h">Последние 24ч</option>
            <option value="7d">Последние 7д</option>
            <option value="30d">Последние 30д</option>
          </select>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {overviewCards.map((card, idx) => (
            <div key={idx} className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-blue-600 rounded-full">
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{card.value}</h3>
              <p className="text-gray-600">{card.title}</p>
            </div>
          ))}
        </div>

        {/* Simple list for daily views */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BarChart className="w-5 h-5" /> Просмотры по дням
          </h2>
          <ul>
            {stats.dailyViews.map((day) => (
              <li key={day.date} className="flex justify-between py-2 border-b last:border-none">
                <span>{new Date(day.date).toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                <span className="font-medium">{day.views.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 