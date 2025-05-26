/**
 * Improved layout: each project occupies its own section.
 * Project info in first row, quality attribute names in second row, and scores in third row.
 */

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Project {
  name: string;
  description: string;
  homepage: string;
  language: string | null;
  repository_url: string;
  keywords: string;
  normalized_licenses: string;
}


interface SearchResultsTableProps {
  query: string;
  page: number;
  selectedNames: Set<string>;
  onToggle: (name: string, checked: boolean) => void;
}


const SearchResultsTable: React.FC<SearchResultsTableProps> = ({ query, page, selectedNames,
  onToggle, }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(
    page && page > 0 ? page : 1
  );
  const [totalPages, setTotalPages] = useState<number>(1);
  useEffect(() => {
    if (!page || page < 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(page);
    }
  }, [page]);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/projects?q=${query}&page=${currentPage}&per_page=18`)
      .then(res => {
        setProjects(res.data.data);
        setTotalPages(res.data.meta.last_page);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [query, currentPage]);

  const formatKeywords = (raw: string): string => {
    try {
      const result = raw
        .replace(/[{}']/g, '')
        .split(',')
        .map(word => word.trim())
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b));
      return result.length === 0 ? 'Empty' : result.join(', ');
    } catch {
      return raw;
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 px-6 py-4">
      {loading && (
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
      )}
      {!loading && projects.map((project, index) => {
        return (
          <div key={index}
            onClick={e => {
              e.stopPropagation();
              window.open(
                `/result?query=${encodeURIComponent(project.name)}`,
                "_blank",
                "noopener,noreferrer"
              );
            }}
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") { // keyboard support
                e.preventDefault();
                e.currentTarget.click();
              }
            }}
          >
            <div className="w-[280px] h-[340px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all p-4 flex flex-col justify-between cursor-pointer">
              <div className="flex-grow overflow-hidden min-h-0 flex flex-col">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1">
                  {project.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-6 mb-2">
                  <strong className="font-large">Description:&nbsp;</strong>{project.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-6 mb-1">
                  <strong className="font-large">Keywords:&nbsp;</strong>
                  {formatKeywords(project.keywords)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mb-1">
                  <strong className="font-large">License:&nbsp;</strong>{formatKeywords(project.normalized_licenses)}
                </p>
              </div>
              <div className="relative text-xs text-gray-500 dark:text-gray-100 mt-2">
                {/* --- CHECKBOX --------------------------------------- */}
                <span>Select:&nbsp;</span>
                <input
                  type="checkbox"
                  className="absolute float-left w-4 h-4 accent-blue-600"
                  checked={selectedNames.has(project.name)}
                  onChange={e => onToggle(project.name, e.target.checked)}
                  onClick={e => e.stopPropagation()}
                />
                {/* ----------------------------------------------------- */}
                <a
                  href={project.homepage || project.repository_url}
                  className="text-blue-600 dark:text-blue-400 underline float-right"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Link to Homepage
                </a>
              </div>
            </div>
          </div>
        );
      })}
      {!loading && totalPages > 1 && (
        <div className="w-full flex justify-center mt-8">
          <div className="inline-flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
            >
              ← Prev
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 rounded ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white'}`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* End of loading projects */}
    </div>
  );
};

export default SearchResultsTable;