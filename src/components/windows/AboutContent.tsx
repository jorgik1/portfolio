import { motion } from 'framer-motion';

const AboutContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-white space-y-6"
    >
      <div className="flex items-center gap-6 flex-wrap">
        <motion.div
          className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-4xl font-bold shadow-2xl"
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          YS
        </motion.div>
        <div>
          <h1 className="text-4xl font-bold mb-2">Yuriy Stenin</h1>
          <p className="text-xl text-gray-300">Full Stack Developer</p>
          <p className="text-gray-400 mt-2">Building elegant solutions for complex problems</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Who I Am</h2>
        <p className="text-gray-300 leading-relaxed">
          I have a proven track record of delivering high-quality web solutions. My expertise lies in 
          PHP, Drupal, JavaScript, MySQL, Git, and I am committed to upholding Clean Code principles 
          (DDD, SOLID, KISS, DRY) to ensure the maintainability and scalability of projects.
        </p>
        <p className="text-gray-300 leading-relaxed">
          I hold a Bachelor's degree in Electrical, Electronics, and Communications Engineering from 
          Kharkiv Polytechnics Institute. Additionally, I have earned a second master's degree in 
          Cybersecurity. Throughout my career, I have successfully led and contributed to a range of 
          diverse projects.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Skills & Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SkillCard skill="PHP & Drupal" level={95} color="from-orange-500 to-red-500" />
          <SkillCard skill="JavaScript" level={90} color="from-yellow-500 to-orange-500" />
          <SkillCard skill="Python (Django, Flask)" level={85} color="from-blue-500 to-cyan-500" />
          <SkillCard skill="MySQL & Database" level={88} color="from-green-500 to-emerald-500" />
          <SkillCard skill="Git & GitHub" level={92} color="from-purple-500 to-pink-500" />
          <SkillCard skill="Clean Code Principles" level={90} color="from-indigo-500 to-blue-500" />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Technologies</h2>
        <div className="flex flex-wrap gap-2">
          {['PHP', 'Drupal 7/8/9', 'JavaScript', 'Python', 'Django', 'Flask',
            'MySQL', 'Git', 'GitHub', 'REST APIs', 'jQuery', 'Symfony', 
            'HTML5', 'CSS3', 'Bootstrap', 'DDD', 'SOLID', 'KISS', 'DRY'].map((tech) => (
            <motion.span
              key={tech}
              className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm"
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: 'rgba(255,255,255,0.15)',
                borderColor: 'rgba(255,255,255,0.3)'
              }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

interface SkillCardProps {
  skill: string;
  level: number;
  color: string;
}

const SkillCard = ({ skill, level, color }: SkillCardProps) => (
  <motion.div
    className="p-4 rounded-xl bg-white/5 border border-white/10"
    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="flex justify-between items-center mb-2">
      <p className="font-medium">{skill}</p>
      <span className="text-sm text-gray-400">{level}%</span>
    </div>
    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        className={`h-full bg-gradient-to-r ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${level}%` }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
      />
    </div>
  </motion.div>
);

export default AboutContent;
