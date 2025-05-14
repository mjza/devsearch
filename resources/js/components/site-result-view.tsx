/**
 * Improved layout: each project occupies its own section.
 * Project info in first row, quality attribute names in second row, and scores in third row.
 */

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface IssueReference {
  reason: string;
  issue_number: number;
  score: number;
}

interface Project {
  name: string;
  description: string;
  homepage: string;
  language: string | null;
  repository_url: string;
  keywords: string;
  normalized_licenses: string;
  total_score: number;
  quality_attributes: Record<string, number>;
  issue_ids: Record<string, IssueReference[]>;  // new field
}


interface SearchResultsTableProps {
  query: string;
}

const getColor = (score: number | undefined): string => {
  if (score === undefined) return '';
  if (score > 0) return 'bg-green-100';
  if (score < 0) return 'bg-pink-100';
  if (score === 0) return 'bg-white';
  return '';
};

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

const SearchResultsTable: React.FC<SearchResultsTableProps> = ({ query }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!query)
      return;
    setLoading(true);
    axios.get(`/api/search?q=${query}`)
      .then(res => setProjects(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [query]);

  function extractCleanGitHubURL(inputUrl: string) {
    if (!inputUrl?.trim()) return null;

    // Regular expression to match GitHub URLs
    const regex = /^https?:\/\/(?:www\.)?github\.com\/([^\/\s]+)\/([^\/\s#]+)(?:[\/#]|$)/i;
    const match = inputUrl.match(regex);

    if (match && match[1] && match[2]) {
      const owner = match[1];
      const repo = match[2].replace(/\.git$/, ''); // Remove .git if present
      return `https://github.com/${owner}/${repo}`;
    }

    return null; // Return null if the URL doesn't match the expected pattern
  }

  function refineIssues(issues: IssueReference[]): IssueReference[] {
    const sortedLimitedIssues: IssueReference[] = issues
      .sort((a, b) => (b.reason || '').localeCompare(a.reason || ''))
      .slice(0, 3);

    while (sortedLimitedIssues.length < 3) {
      sortedLimitedIssues.push({
        reason: '',
        issue_number: 0,
        score: 0,
      });
    }

    return sortedLimitedIssues;
  }

  function formatScore(score: number) {
    const value = (100 * score).toFixed(2);           // e.g., "-3.40"
    const [intPart, decPart] = value.split('.');       // e.g., ["-3", "40"]

    const isNegative = intPart.startsWith('-');
    const absInt = Math.abs(parseInt(intPart, 10));    // e.g., 3
    const paddedInt = absInt.toString().padStart(2, '0'); // e.g., "03"

    return `${isNegative ? '-' : score > 0 ? '+' : '0'}${paddedInt}.${decPart}`;
  }



  return (
    <div className="flex-1 flex flex-col min-w-full items-center justify-start px-6 py-4">
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
        const cleanRepositoryUrl = extractCleanGitHubURL(project.repository_url);

        if (!cleanRepositoryUrl)
          return null;

        const attributes = Object.keys(project.quality_attributes || {}).sort((a, b) => a.localeCompare(b));

        return (
          <div key={index}
            className="container mx-auto px-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-4 my-6"
          >
            {/* Project Info */}
            <div className="mb-4 space-y-1 text-sm text-gray-800 dark:text-gray-200">
              <div><strong>Name:</strong>&nbsp;{project.name}</div>
              <div><strong>Description:</strong>&nbsp;{project.description}</div>
              <div><strong>Keywords:</strong>&nbsp;{formatKeywords(project.keywords)}</div>
              <div><strong>Repository:</strong>&nbsp;
                <a href={project.repository_url} className="text-blue-600 dark:text-blue-400 underline" target="_blank" rel="noopener noreferrer">
                  {project.repository_url}
                </a>
              </div>
              <div><strong>License:</strong>&nbsp;{formatKeywords(project.normalized_licenses)}</div>
              <div><strong>Total Score:</strong>&nbsp;

                <span className={`text-sm font-bold text-black ${getColor(project.total_score)} whitespace-nowrap p-1 rounded-sm`}>
                  {formatScore(project.total_score)}
                </span>
              </div>
            </div>

            {/* Attributes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {attributes.map(attr => {
                const score = project.quality_attributes[attr];
                const issues = project.issue_ids?.[attr] || [];

                return (
                  <div
                    key={attr}
                    className="flex flex-wrap items-center justify-between bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-2 gap-x-4 gap-y-2"
                  >
                    {/* Left: Attribute */}
                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">
                      {attr}
                    </div>

                    {/* Center: Score */}
                    <div className="flex-1 flex justify-end">
                      <div className={`text-sm font-bold ${getColor(score)} whitespace-nowrap  p-1 rounded-sm`}>
                        {score !== undefined ? formatScore(score) : 'Unknown'}
                      </div>
                    </div>

                    {/* Right: Links */}
                    <div className="flex flex-wrap gap-2 justify-end min-w-fit ml-auto">
                      {
                        refineIssues(issues).map((issue, idx) => (
                          <div key={idx} className="relative group">
                            {issue.reason ? (
                              <>
                                <a
                                  href={`${cleanRepositoryUrl}/issues/${issue.issue_number}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 dark:text-blue-400 underline text-xs whitespace-nowrap"
                                >
                                  Reference {idx + 1}
                                </a>
                                <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition duration-300 bg-gray-100 dark:bg-gray-500 border border-gray-200 dark:border-gray-700 dark:text-white text-xs rounded px-2 py-1 z-10 min-w-[10rem] max-w-xs text-left break-words">
                                  <b>Reason:</b>&nbsp;
                                  <i>
                                    {issue.reason}&nbsp;({formatScore(issue.score)})
                                  </i>
                                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-px w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-gray-200 dark:border-t-gray-700 dark:border-t-gray-700 z-[-1]"></div>
                                </div>
                              </>
                            ) : (
                              <span className="text-gray-400 text-xs whitespace-nowrap cursor-not-allowed">
                                Reference {idx + 1}
                              </span>
                            )}

                          </div>
                        ))}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        );
      })}

      {/* End of loading projects */}
    </div>
  );
};

export default SearchResultsTable;