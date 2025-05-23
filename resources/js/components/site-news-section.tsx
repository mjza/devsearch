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
        <div className="flex justify-center items-center py-10">
          <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
            <div className="flex items-end gap-8">
              <svg className="w-12 h-12 text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none"
                xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path
                  d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                  stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path
                  d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                  stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900">
                </path>
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center md:justify-between">
          {news.map((item) => (
            <div
              key={item.id}
              className="flex-1 rounded-lg bg-white dark:bg-[#1b1b1b] shadow-sm p-4 flex flex-col justify-between md:max-w-[485px] h-[200px] min-w-0"
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
