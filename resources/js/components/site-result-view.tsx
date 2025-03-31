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
  total_score: number;
  quality_attributes: Record<string, number>;
}

interface SearchResultsTableProps {
  query: string;
}

const getColor = (score: number | undefined): string => {
  if (score === undefined) return '';
  if (score > 0) return 'bg-green-100';
  if (score < 0) return 'bg-pink-100';
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
                  stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
                <path
                  d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                  stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" className="text-gray-900">
                </path>
              </svg>
            </div>
          </div>
        </div>
      )}
      {!loading && projects.map((project, index) => {
        const attributes = Object.keys(project.quality_attributes || {}).sort((a, b) => a.localeCompare(b));
        return (
          <table key={index} className="table-auto border-collapse w-full my-6">
            <tbody>
              {/* Row 1: Project Info */}
              <tr className="bg-gray-50">
                <td className="px-2 py-1" colSpan={attributes.length + 1}>
                  <div><strong>Name:</strong> {project.name}</div>
                  <div><strong>Description:</strong> {project.description}</div>
                  <div><strong>Keywords:</strong> {formatKeywords(project.keywords)}</div>
                  <div><strong>Homepage:</strong> <a href={project.homepage} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{project.homepage}</a></div>
                  <div><strong>License:</strong> {formatKeywords(project.normalized_licenses)}</div>
                  <div><strong>Total Score:</strong> {project.total_score.toFixed(3)}</div>
                </td>
              </tr>

              {/* Row 2: Attribute Names */}
              <tr className="bg-gray-100 border">
                <td className="border px-2 py-1 font-semibold text-center">Attributes</td>
                {attributes
                .map(attr => (
                  <td key={attr} className="border px-2 py-1 text-center text-xs font-bold">
                    {attr}
                  </td>
                ))}
              </tr>

              {/* Row 3: Scores */}
              <tr className="border">
                <td className="border px-2 py-1 font-semibold text-center">Scores</td>
                {attributes
                .map(attr => {
                  const score = project.quality_attributes[attr];
                  return (
                    <td
                      key={attr}
                      className={`border px-2 py-1 text-center ${getColor(score)}`}
                    >
                      {score !== undefined ? score.toFixed(3) : '-'}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        );
      })}
    </div>
  );
};

export default SearchResultsTable;