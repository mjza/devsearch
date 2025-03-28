import React, { useEffect, useState } from 'react';

interface NewsItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  timestamp: string;
  link?: string;
}

// Simulated backend call (no delay)
function fetchNewsItems(): NewsItem[] {
  return [
    {
      id: '1',
      tag: 'Frontend · React',
      title: 'React 18.0 Released',
      description:
        'New features include automatic batching, concurrent rendering, and improved suspense support.',
      timestamp: '2 hours ago',
      link: '#',
    },
    {
      id: '2',
      tag: 'Tooling · Webpack',
      title: 'Webpack 6 Beta',
      description:
        'The first beta version of Webpack 6 is out. Includes faster builds and improved tree-shaking.',
      timestamp: '1 day ago',
      link: '#',
    },
    {
      id: '3',
      tag: 'Community',
      title: 'DevSearch Now Open Source',
      description:
        'Our core search engine is now open source under the MIT License. Contributions welcome!',
      timestamp: '3 days ago',
      link: '#',
    },
  ];
}

export default function SiteNewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const items = fetchNewsItems();
    setNews(items);
  }, []);

  return (
    <section className="mx-auto my-12 px-4">
      <h2 className="mb-6 text-2xl font-bold text-[color:var(--brand-primary-light)] dark:text-[color:var(--brand-accent)]">
      Latest Software News
      </h2>

      <div className="flex flex-wrap gap-6 justify-start">
        {news.map((item) => (
          <div
            key={item.id}
            className="w-full max-w-[485px] h-[200px] rounded-[8px] bg-white p-4 shadow-sm dark:bg-[#1b1b1b] flex flex-col justify-between"
          >
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                {item.tag}
              </p>
              <h3 className="text-lg font-semibold text-black dark:text-white">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                {item.description}
              </p>
            </div>
            <div className="flex items-center justify-between text-sm mt-4">
              <span className="text-gray-400">{item.timestamp}</span>
              <a
                href={item.link}
                className="font-medium text-[color:var(--brand-primary-light)] hover:underline dark:text-[color:var(--brand-accent)]"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
