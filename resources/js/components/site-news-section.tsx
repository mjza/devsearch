import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

interface NewsItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  timestamp: string;
  link?: string;
}

export default function SiteNewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/news')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch news');
        }
        return res.json();
      })
      .then((data) => {
        setNews(data);
      })
      .catch((err) => {
        console.error('Error loading news:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="mx-auto my-12 w-full px-4">
      <h2 className="mb-6 text-2xl font-bold text-[color:var(--brand-primary-light)] dark:text-[color:var(--brand-accent)]">
        Latest Software News
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading news...</p>
      ) : (
        <div className="flex flex-row gap-4 justify-between">
          {news.map((item) => (
            <div
              key={item.id}
              className="flex-1 rounded-lg bg-white dark:bg-[#1b1b1b] shadow-sm p-4 flex flex-col justify-between max-w-[485px] h-[200px] min-w-0"
            >
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  {item.tag}
                </p>
                <h3 className="text-lg font-semibold text-[color:var(--brand-primary)] dark:text-[color:var(--brand-primary-light)]">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                  {item.description}
                </p>
              </div>
              <div className="flex items-center justify-between text-sm mt-4">
                <span className="text-gray-400">{formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}</span>
                <a
                  href={item.link}
                  className="font-medium text-blue-500 hover:underline dark:text-[color:var(--brand-accent)]"
                >
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
