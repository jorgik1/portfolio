import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaGithub, FaStar, FaCodeBranch, FaBook } from 'react-icons/fa';

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  bio: string;
  location: string;
  blog: string;
  avatar_url: string;
  name: string;
}

interface Repository {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
}

const GitHubStatsContent = () => {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch user stats
        const userResponse = await fetch('https://api.github.com/users/jorgik1');
        if (!userResponse.ok) throw new Error('Failed to fetch GitHub data');
        const userData = await userResponse.json();
        setStats(userData);

        // Fetch repositories
        const reposResponse = await fetch('https://api.github.com/users/jorgik1/repos?sort=updated&per_page=6');
        if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
        const reposData = await reposResponse.json();
        setRepos(reposData);

        setLoading(false);
      } catch (err) {
        setError('Failed to load GitHub data. Please try again later.');
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-white">
          <p className="text-red-400 mb-4">{error}</p>
          <p className="text-gray-400">Visit my GitHub directly:</p>
          <a
            href="https://github.com/jorgik1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            github.com/jorgik1
          </a>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const memberSince = new Date(stats.created_at).getFullYear();
  const yearsOnGitHub = new Date().getFullYear() - memberSince;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-white space-y-6"
    >
      {/* Header with Avatar */}
      <div className="flex items-center gap-6">
        <motion.img
          src={stats.avatar_url}
          alt="GitHub Avatar"
          className="w-24 h-24 rounded-full border-4 border-purple-500"
          whileHover={{ scale: 1.05, rotate: 5 }}
        />
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">{stats.name}</h2>
          <p className="text-gray-300 mb-2">{stats.bio}</p>
          <motion.a
            href="https://github.com/jorgik1"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300"
          >
            <FaGithub />
            @jorgik1
          </motion.a>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<FaBook />}
          label="Repositories"
          value={stats.public_repos}
          color="from-blue-500 to-cyan-500"
        />
        <StatCard
          icon={<FaStar />}
          label="Total Stars"
          value={repos.reduce((acc, repo) => acc + repo.stargazers_count, 0)}
          color="from-yellow-500 to-orange-500"
        />
        <StatCard
          icon={<FaCodeBranch />}
          label="Followers"
          value={stats.followers}
          color="from-purple-500 to-pink-500"
        />
        <StatCard
          icon={<FaGithub />}
          label="Years on GitHub"
          value={yearsOnGitHub}
          color="from-green-500 to-emerald-500"
        />
      </div>

      {/* Recent Repositories */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">Recent Repositories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repos.map((repo, index) => (
            <motion.a
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-white">{repo.name}</h4>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <FaStar className="w-3 h-3" />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCodeBranch className="w-3 h-3" />
                    {repo.forks_count}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                {repo.description || 'No description available'}
              </p>
              {repo.language && (
                <span className="inline-block px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-200">
                  {repo.language}
                </span>
              )}
            </motion.a>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <motion.div className="flex justify-center">
        <motion.a
          href="https://github.com/jorgik1?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg font-medium inline-flex items-center gap-2"
        >
          <FaGithub />
          View All Repositories on GitHub
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}

const StatCard = ({ icon, label, value, color }: StatCardProps) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -4 }}
    className="p-4 rounded-xl bg-white/5 border border-white/10 relative overflow-hidden"
  >
    <motion.div
      className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10`}
    />
    <div className="relative z-10">
      <div className={`text-2xl mb-2 bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
        {icon}
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  </motion.div>
);

export default GitHubStatsContent;
