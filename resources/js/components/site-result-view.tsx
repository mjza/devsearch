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
    const result = raw.replace(/[{}']/g, '').split(',').map(word => word.trim()).filter(Boolean);
    return result.length === 0 ? 'Empty' : result.join(', ');
  } catch {
    return raw;
  }
};

const SearchResultsTable: React.FC<SearchResultsTableProps> = ({ query }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (!query) return;
    axios.get(`/api/search?q=${query}`)
      .then(res => setProjects(res.data.data))
      .catch(console.error);
  }, [query]);

  return (
    <div className="overflow-x-auto text-sm space-y-8">
      {projects.map((project, index) => {
        const attributes = Object.keys(project.quality_attributes || {});
        return (
          <table key={index} className="table-auto border-collapse w-full">
            <tbody>
              {/* Row 1: Project Info */}
              <tr className="bg-gray-50">
                <td className="px-2 py-1" colSpan={attributes.length + 1}>
                  <div><strong>Name:</strong> {project.name}</div>
                  <div><strong>Description:</strong> {project.description}</div>
                  <div><strong>Keywords:</strong> {formatKeywords(project.keywords)}</div>
                  <div><strong>Homepage:</strong> <a href={project.homepage} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{project.homepage}</a></div>
                  <div><strong>Total Score:</strong> {project.total_score.toFixed(3)}</div>
                </td>
              </tr>

              {/* Row 2: Attribute Names */}
              <tr className="bg-gray-100 border">
                <td className="border px-2 py-1 font-semibold text-center">Attributes</td>
                {attributes.map(attr => (
                  <td key={attr} className="border px-2 py-1 text-center text-xs font-bold">
                    {attr}
                  </td>
                ))}
              </tr>

              {/* Row 3: Scores */}
              <tr className="border">
                <td className="border px-2 py-1 font-semibold text-center">Scores</td>
                {attributes.map(attr => {
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