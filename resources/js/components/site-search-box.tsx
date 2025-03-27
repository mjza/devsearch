
import { useState } from 'react';

const mockTags = [
  'Front-end Frameworks',
  'Databases',
  'Authentication',
  'Payment Systems',
];

export default function SearchBox() {
  const [input, setInput] = useState('');

  const handleTagClick = (tag: string) => {
    setInput(tag);
  };

  const handleSearch = () => {
    // You can replace this with your actual search logic
    console.log('Searching for:', input);
  };

  return (
    <div className="relative mx-auto w-full max-w-[1036px] sm:w-[90%] md:w-[80%] lg:w-[70%] h-[164px] rounded-[10px] bg-white shadow-[0_5px_5px_-5px_rgba(51,51,51,1)] p-6 flex flex-col justify-between">
      {/* Input field + button row */}
      <div className="flex w-full gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="SearchSearch packages, components, or libraries..."
          className="flex-1 rounded-md border border-gray-300 px-4 py-3 text-[16px] font-sans text-black placeholder-gray-400 shadow-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        <button
          onClick={handleSearch}
          className="whitespace-nowrap rounded-md bg-[color:var(--brand-primary-light)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[color:var(--brand-accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-accent)]"
        >
          Search
        </button>
      </div>

      {/* Tag buttons */}
      <div className="mt-4 flex flex-wrap gap-3">
        {mockTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className="rounded-full border border-gray-300 bg-gray-100 px-4 py-1 text-sm text-gray-700 transition hover:border-gray-500 hover:bg-gray-200"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

