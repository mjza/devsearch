import React from 'react';

interface ProjectStats {
  title: string;
  downloads: string;
  stars: string;
}

interface ComparisonItem {
  id: number;
  left: ProjectStats;
  right: ProjectStats;
  link?: string;
}

const comparisons: ComparisonItem[] = [
  {
    id: 1,
    left: {
      title: 'React',
      downloads: '2M+',
      stars: '180k',
    },
    right: {
      title: 'Vue',
      downloads: '1M+',
      stars: '150k',
    },
    link: '#',
  },
  {
    id: 2,
    left: {
      title: 'Express',
      downloads: '1.2M+',
      stars: '60k',
    },
    right: {
      title: 'Fastify',
      downloads: '8k',
      stars: '5k',
    },
    link: '#',
  },
  {
    id: 3,
    left: {
      title: 'Next.js',
      downloads: '900k+',
      stars: '100k',
    },
    right: {
      title: 'Nuxt.js',
      downloads: '1M+',
      stars: '200k',
    },
    link: '#',
  },
];

export default function SitePopularComparisonsSection() {
  return (
    <section className="mx-auto my-6 w-full px-4">
      <h2 className="mb-6 text-2xl font-bold text-[color:var(--brand-primary-light)] dark:text-[color:var(--brand-accent)]">
        Popular Comparisons
      </h2>

      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center md:justify-between">
        {comparisons.filter( item => item.id < 3).map((item) => (
          <div
            key={item.id}
            className="flex-1 rounded-lg bg-white dark:bg-[#1b1b1b] shadow-sm p-5 flex flex-col justify-center min-h-[140px] min-w-0"
          >
            <div className="flex items-center justify-between">
              <h3 className="flex gap-4 text-lg font-semibold text-[color:var(--brand-primary)] dark:text-[color:var(--brand-primary-light)]">
                <span>{item.left.title}</span>
                <span className='text-[color:var(--brand-accent)] font-normal'>vs</span>
                <span>{item.right.title}</span>
              </h3>
              <a
                href={item.link}
                className="text-sm font-medium text-blue-500 hover:underline dark:text-[color:var(--brand-accent)]"
              >
                Compare
              </a>
            </div>
            <div className="mt-4 flex justify-start gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div>
                <span className="font-semibold">Downloads: </span>
                <div className='inline-flex gap-1'><span>{item.left.downloads}</span><span>vs</span><span>{item.right.downloads}</span></div>
              </div>
              <div></div>
              <div>
                <span className="font-semibold">Stars: </span>
                <div className='inline-flex gap-1'><span>{item.left.stars}</span><span>vs</span><span>{item.right.stars}</span></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

