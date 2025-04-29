
import { useState } from 'react';
import { router } from '@inertiajs/react';

const mockTags = [
  'Front-end Frameworks',
  'Databases',
  'Authentication',
  'Payment Systems',
];

type Props = {
  title?: string;
  query?: string;
};

export default function SearchBox({ title, query }: Props) {
  const [input, setInput] = useState(query ?? '');

  const handleTagClick = (tag: string) => {
    setInput(tag);
  };

  const handleSearch = () => {
    router.visit(route('result') + `?query=${encodeURIComponent(input)}`);
  };

  return (
    <div className="relative mx-4 md:mx-auto max-w-[1036px] sm:w-[90%] md:w-[80%] lg:w-[70%] h-[164px] rounded-[10px] bg-white dark:bg-gray-900 shadow-[0_5px_5px_-5px_rgba(51,51,51,1)] p-6 flex flex-col justify-between">

      {/* Conditionally render title */}
      {title && (
        <h1 className="mb-3 text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold text-[color:var(--brand-primary-light)] dark:text-[color:var(--brand-accent)]">
          {title}
        </h1>
      )}


      {/* Input field + button row */}
      <div className="flex w-full gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && input.trim()) {
              handleSearch();
            }
          }}
          placeholder="Search packages, components, or libraries..."
          className="flex-1 rounded-md border border-gray-300 px-4 py-3 text-[16px] font-sans text-black dark:text-white placeholder-gray-400 shadow-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        <button
          onClick={handleSearch}
          disabled={!input?.trim()}
          className={`whitespace-nowrap rounded-md px-6 py-3 text-sm font-semibold text-white shadow-sm transition focus:outline-none focus:ring-2
              ${!input?.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[color:var(--brand-primary-light)] hover:bg-[color:var(--brand-accent)] focus:ring-[color:var(--brand-accent)]'
            }`}
        >
          Search
        </button>
      </div>

      {/* Tag buttons */}
      {!title && (
        <div className="mt-4 flex flex-wrap gap-3 overflow-hidden">
          {mockTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 bg-[#E0E0E0] text-[15px] transition hover:border-gray-500 hover:bg-gray-200"
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

