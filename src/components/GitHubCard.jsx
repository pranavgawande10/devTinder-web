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
    <div className="w-full mt-4 p-5 rounded-[2rem] glass-card border border-white/5 relative overflow-hidden group">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-accent/10 rounded-full blur-3xl group-hover:bg-secondary-accent/20 transition-colors"></div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-4 relative z-10">
        <FaGithub className="text-white text-2xl" />
        <h3 className="text-white font-extrabold text-lg tracking-wide">GitHub</h3>
        {githubData.publicRepos && (
          <span className="text-xs font-semibold text-secondary-accent ml-auto bg-secondary-accent/10 px-3 py-1 rounded-full border border-secondary-accent/20">
            {githubData.publicRepos} repos · {githubData.followers} followers
          </span>
        )}
      </div>

      {/* Language Badges */}
      {githubData.topLanguages && githubData.topLanguages.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5 relative z-10">
          {githubData.topLanguages.map((lang) => (
            <span
              key={lang}
              className="px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider border border-white/5 backdrop-blur-md shadow-sm"
              style={{ backgroundColor: (languageColors[lang] || '#6e7681') + '15', color: languageColors[lang] || '#8b949e' }}
            >
              {lang}
            </span>
          ))}
        </div>
      )}

      {/* Repo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
        {githubData.repos.slice(0, 4).map((repo) => (
          <a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-navy-800/50 border border-white/5 hover:border-secondary-accent/30 hover:bg-navy-800/80 transition-all duration-300 hover:-translate-y-1 block group/repo"
          >
            <p className="text-sm font-bold text-gray-200 group-hover/repo:text-secondary-accent truncate transition-colors">{repo.name}</p>
            <p className="text-[11px] text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">{repo.description || 'No description'}</p>
            <div className="flex items-center gap-4 mt-3 text-[11px] font-medium text-gray-500">
              {repo.language && (
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: languageColors[repo.language] || '#6e7681' }}></span>
                  {repo.language}
                </span>
              )}
              <span className="flex items-center gap-1.5"><FaStar className="text-yellow-500/70" /> {repo.stars}</span>
              <span className="flex items-center gap-1.5"><FaCodeBranch className="text-blue-400/70" /> {repo.forks}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default GitHubCard;
