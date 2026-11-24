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
      link: 'https://github.com/jorgik1/darksky-client'
    },
    {
      title: 'Real-time Data Visualization',
      description: 'Tutorial on real-time data visualization using D3.js, Crossfilter, and WebSockets for dynamic data filtering and display.',
      tech: ['D3.js', 'WebSockets', 'Crossfilter', 'Real-time'],
      link: '#'
    },
    {
      title: 'WorldPay Integration',
      description: 'Complete integration solution for WorldPay Payment Gateway, enabling secure payment processing for e-commerce applications.',
      tech: ['PHP', 'Payments', 'E-commerce', 'API'],
      link: 'https://github.com/jorgik1/commerce_worldpay'
    },
    {
      title: 'Social Network Posts Module',
      description: 'Drupal module for aggregating and displaying posts from various social networks in a unified interface.',
      tech: ['Drupal', 'PHP', 'Social Media', 'API'],
      link: '#'
    },
    {
      title: 'Streaming Music Player',
      description: 'Modern streaming music player application with playlist management, real-time audio streaming, and user-friendly interface.',
      tech: ['JavaScript', 'Streaming', 'Audio', 'UI/UX'],
      link: '#'
    },
    {
      title: 'Drupal 8 Resources',
      description: 'Comprehensive collection of Drupal 8 links and resources for developers, including best practices and useful modules.',
      tech: ['Drupal 8', 'Documentation', 'Resources'],
      link: 'https://github.com/jorgik1/drupal8-links'
    },
    {
      title: 'E-commerce Platform Development',
      description: 'Collaborated with cross-functional teams to develop e-commerce solutions. Utilized APIs for integrations, hosted on AWS, and participated in daily stand-ups and retrospective meetings.',
      tech: ['Drupal', 'PHP', 'E-commerce', 'AWS'],
      link: '#'
    },
    {
      title: 'Django WebSocket System',
      description: 'CRUD for Django entities. Logic for validation. Key features: Django, WebSockets, Celery, Redis, JS. Developed for NDA Learner Information System.',
      tech: ['Django', 'WebSockets', 'Celery', 'Redis'],
      link: '#'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className={`text-3xl font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Projects</h2>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
          Open source code and client work: PHP and Drupal modules, API integrations and real-time applications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-xl border relative overflow-hidden
              ${isDarkMode
                ? 'bg-white/5 border-white/10 hover:bg-white/10'
                : 'bg-black/5 border-black/5 hover:bg-black/10'}`}
          >
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-3">
                <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {project.title}
                </h3>
                <div className="flex gap-2">
                  {project.link !== '#' && (
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title}: open source code`}
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
                  <span
                    key={tech}
                    className={`px-3 py-1 text-xs rounded-full border
                      ${isDarkMode
                        ? 'bg-white/10 text-white border-white/20'
                        : 'bg-black/5 text-gray-800 border-black/10'}`}
                  >
                    {tech}
                  </span>
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
            ? 'bg-white/5 border-white/15'
            : 'bg-black/5 border-black/10'}`}
      >
        <h3 className={`text-xl font-display font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>More on GitHub</h3>
        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          My other repositories and open source contributions are on GitHub.
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
          Open GitHub profile
        </motion.a>
      </motion.div>
    </div>
  );
};

export default ProjectsContent;
