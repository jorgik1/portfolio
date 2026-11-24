import { useSettings } from '../../context/SettingsContext';
import { portfolioConfig } from '../../data/portfolio';

const technologies = [
  'PHP', 'Drupal', 'Symfony', 'JavaScript', 'Node.js', 'Python', 'Django', 'FastAPI',
  'MySQL', 'REST APIs', 'RAG', 'MCP', 'Claude', 'Git', 'DDD', 'SOLID',
];

const AboutContent = () => {
  const { isDarkMode } = useSettings();
  const muted = isDarkMode ? 'text-gray-300' : 'text-gray-700';

  return (
    <div className={`space-y-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      <div className="flex items-center gap-6 flex-wrap">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-indigo-600 flex items-center justify-center text-3xl sm:text-4xl font-display font-bold text-white">
          YS
        </div>
        <div>
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-2 tracking-tight">{portfolioConfig.personal.name}</h1>
          <p className={`text-xl font-medium ${muted}`}>{portfolioConfig.personal.role}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-display font-semibold">Who I am</h2>
        <p className={`${muted} leading-relaxed max-w-prose`}>
          Senior PHP and Drupal developer, now building AI into the kind of systems I have spent my
          career keeping alive. For 10 years I have worked on complex Drupal and PHP platforms:
          architecture, integrations, migrations, and the technical specs that stop a project from
          falling apart between design and production.
        </p>
        <p className={`${muted} leading-relaxed max-w-prose`}>
          Clients now ask for search that understands intent and assistants that work over internal
          documentation. I build those with Python (Django and FastAPI), Node.js, and RAG and agent
          patterns on Claude. I am based in Cracow and work with clients across Europe.
        </p>
        <p className={`${muted} leading-relaxed max-w-prose`}>
          I hold a Master's degree in Electrical and Electronics Engineering from the National
          Technical University "Kharkiv Polytechnic Institute".
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-display font-semibold">Technologies</h2>
        <ul className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <li
              key={tech}
              className={`px-4 py-2 rounded-full text-sm border ${isDarkMode ? 'bg-white/10 border-white/20' : 'bg-black/5 border-black/10 text-gray-800'}`}
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>

      <div className={`p-6 rounded-xl border flex items-center justify-between flex-wrap gap-4 ${isDarkMode ? 'bg-white/5 border-white/15' : 'bg-black/5 border-black/10'}`}>
        <div>
          <h3 className="text-xl font-semibold mb-1">Work history</h3>
          <p className={`text-sm ${muted}`}>My full experience and education are on LinkedIn.</p>
        </div>
        <a
          href={portfolioConfig.personal.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
        >
          Open LinkedIn profile
        </a>
      </div>
    </div>
  );
};

export default AboutContent;
