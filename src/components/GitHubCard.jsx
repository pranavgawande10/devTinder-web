import React from 'react';
import { FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa';

const languageColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Dart: '#00B4AB',
};

const GitHubCard = ({ githubData }) => {
  if (!githubData || !githubData.repos || githubData.repos.length === 0) return null;

  return (
    <div className="w-full mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <FaGithub className="text-white text-xl" />
        <h3 className="text-white font-bold text-lg">GitHub</h3>
        {githubData.publicRepos && (
          <span className="text-xs text-gray-400 ml-auto">{githubData.publicRepos} repos · {githubData.followers} followers</span>
        )}
      </div>

      {/* Language Badges */}
      {githubData.topLanguages && githubData.topLanguages.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {githubData.topLanguages.map((lang) => (
            <span
              key={lang}
              className="px-3 py-1 rounded-full text-xs font-semibold border border-white/10"
              style={{ backgroundColor: (languageColors[lang] || '#6e7681') + '20', color: languageColors[lang] || '#8b949e' }}
            >
              {lang}
            </span>
          ))}
        </div>
      )}

      {/* Repo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {githubData.repos.slice(0, 4).map((repo) => (
          <a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-pink-500/30 transition-all hover:scale-[1.02] block"
          >
            <p className="text-sm font-semibold text-pink-400 truncate">{repo.name}</p>
            <p className="text-xs text-gray-400 mt-1 line-clamp-2">{repo.description || 'No description'}</p>
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
              {repo.language && (
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: languageColors[repo.language] || '#6e7681' }}></span>
                  {repo.language}
                </span>
              )}
              <span className="flex items-center gap-1"><FaStar className="text-yellow-500" /> {repo.stars}</span>
              <span className="flex items-center gap-1"><FaCodeBranch /> {repo.forks}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default GitHubCard;
