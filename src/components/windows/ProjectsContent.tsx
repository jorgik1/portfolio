import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useSettings } from '../../context/SettingsContext';

const ProjectsContent = () => {
  const { isDarkMode } = useSettings();

  const projects = [
    {
      title: 'Dark Sky PHP API Client',
      description: 'Async first PHP API Client for Dark Sky weather service. Provides comprehensive weather data integration with asynchronous request handling.',
      tech: ['PHP', 'API', 'Async', 'Weather'],
      link: 'https://darksky.net',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Real-time Data Visualization',
      description: 'Tutorial on real-time data visualization using D3.js, Crossfilter, and WebSockets for dynamic data filtering and display.',
      tech: ['D3.js', 'WebSockets', 'Crossfilter', 'Real-time'],
      link: '#',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'WorldPay Integration',
      description: 'Complete integration solution for WorldPay Payment Gateway, enabling secure payment processing for e-commerce applications.',
      tech: ['PHP', 'Payments', 'E-commerce', 'API'],
      link: 'http://www.worldpay.com',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Social Network Posts Module',
      description: 'Drupal module for aggregating and displaying posts from various social networks in a unified interface.',
      tech: ['Drupal', 'PHP', 'Social Media', 'API'],
      link: '#',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      title: 'Streaming Music Player',
      description: 'Modern streaming music player application with playlist management, real-time audio streaming, and user-friendly interface.',
      tech: ['JavaScript', 'Streaming', 'Audio', 'UI/UX'],
      link: '#',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      title: 'Drupal 8 Resources',
      description: 'Comprehensive collection of Drupal 8 links and resources for developers, including best practices and useful modules.',
      tech: ['Drupal 8', 'Documentation', 'Resources'],
      link: '#',
      gradient: 'from-teal-500 to-blue-500'
    },
    {
      title: 'E-commerce Platform Development',
      description: 'Collaborated with cross-functional teams to develop e-commerce solutions. Utilized APIs for integrations, hosted on AWS, and participated in daily stand-ups and retrospective meetings.',
      tech: ['Drupal', 'PHP', 'E-commerce', 'AWS'],
      link: '#',
      gradient: 'from-blue-600 to-indigo-600'
    },
    {
      title: 'Django WebSocket System',
      description: 'CRUD for Django entities. Logic for validation. Key features: Django, WebSockets, Celery, Redis, JS. Developed for NDA Learner Information System.',
      tech: ['Django', 'WebSockets', 'Celery', 'Redis'],
      link: '#',
      gradient: 'from-green-600 to-teal-600'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Featured Projects</h2>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
          A collection of projects showcasing my expertise in web development,
          API integrations, and real-time applications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className={`group p-6 rounded-xl border transition-all cursor-pointer relative overflow-hidden
              ${isDarkMode
                ? 'bg-white/5 border-white/10 hover:bg-white/10'
                : 'bg-black/5 border-black/5 hover:bg-black/10'}`}
          >
            {/* Gradient overlay on hover */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
            />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-3">
                <h3 className={`text-xl font-semibold transition-all
                  ${isDarkMode ? 'text-white' : 'text-gray-900'}
                  group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-100`}
                >
                  {project.title}
                </h3>
                <div className="flex gap-2">
                  {project.link !== '#' && (
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaExternalLinkAlt className="w-4 h-4" />
                    </motion.a>
                  )}
                </div>
              </div>

              <p className={`mb-4 text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map(tech => (
                  <motion.span
                    key={tech}
                    whileHover={{ scale: 1.05 }}
                    className={`px-3 py-1 text-xs rounded-full border
                      ${isDarkMode
                        ? 'bg-white/10 text-white border-white/20'
                        : 'bg-black/5 text-gray-800 border-black/10'}`}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className={`mt-8 p-6 rounded-xl border
          ${isDarkMode
            ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-white/20'
            : 'bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-black/10'}`}
      >
        <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Want to see more?</h3>
        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Check out my GitHub profile for more projects and contributions to open source.
        </p>
        <motion.a
          href="https://github.com/jorgik1"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg border font-medium transition-all
            ${isDarkMode
              ? 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
              : 'bg-black/5 hover:bg-black/10 border-black/10 text-gray-900'}`}
        >
          <FaGithub className="w-5 h-5" />
          Visit GitHub Profile
        </motion.a>
      </motion.div>
    </div>
  );
};

export default ProjectsContent;
