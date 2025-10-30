import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const TerminalContent = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ type: 'command' | 'output', text: string }>>([
    { type: 'output', text: 'Welcome to Yuriy\'s Terminal v1.0.0' },
    { type: 'output', text: 'Type "help" for available commands' },
    { type: 'output', text: '' },
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, string | (() => string)> = {
    help: `Available commands:
    
  about      - Learn about me
  skills     - Show my technical skills
  experience - View work experience
  projects   - List featured projects
  education  - Show education background
  contact    - Get contact information
  github     - Open GitHub profile
  linkedin   - Open LinkedIn profile
  hire       - Let's work together!
  clear      - Clear terminal
  whoami     - Who am I?
  date       - Show current date/time
  
Type any command and press Enter`,

    whoami: `Yuriy Stenin
Full Stack Developer | PHP & Drupal Expert
Based in Poland, Andrzew`,

    about: `👋 Hi, I'm Yuriy Stenin!

I have a proven track record of delivering high-quality web solutions.
My expertise lies in PHP, Drupal, JavaScript, MySQL, and Git.

I'm committed to upholding Clean Code principles (DDD, SOLID, KISS, DRY)
to ensure the maintainability and scalability of projects.

🎓 Education:
  • Master's in Cybersecurity
  • Bachelor's in Electrical, Electronics, and Communications Engineering
    (Kharkiv Polytechnics Institute)

💼 Currently: PHP/Drupal Developer at ForTorSoft (2015-present)`,

    skills: `🛠️ Technical Skills:

Backend:
  ✓ PHP           ████████████████░░ 95%
  ✓ Drupal 7/8/9  ████████████████░░ 95%
  ✓ Python        █████████████░░░░░ 85%
  ✓ MySQL         ███████████████░░░ 88%

Frontend:
  ✓ JavaScript    ███████████████░░░ 90%
  ✓ HTML/CSS      ███████████████░░░ 90%
  ✓ jQuery        ██████████████░░░░ 85%

Tools & Practices:
  ✓ Git/GitHub    ████████████████░░ 92%
  ✓ Clean Code    ███████████████░░░ 90%
  ✓ REST APIs     ███████████████░░░ 88%
  ✓ Symfony       █████████████░░░░░ 80%`,

    experience: `💼 Work Experience:

[2015 - Present] PHP/Drupal Developer @ ForTorSoft
  • Developed high-quality web solutions using Clean Code principles
  • Led e-commerce platform development projects
  • Collaborated with cross-functional teams in agile environment
  • Integrated payment gateways and third-party APIs
  
[2023 - 2023] Junior Python Developer @ NDA Learner
  • Built Django applications with WebSocket support
  • Implemented CRUD operations and validation logic
  • Used Celery, Redis for background tasks

[2022 - 2023] PHP Developer @ NDA Producer
  • Developed paper products management system
  • Led migration to Drupal 8 with Long Hangs SQL Studio
  • Ensured CMS feature parity and data integrity`,

    education: `🎓 Education:

[2022 - 2024] Master's Degree in Cybersecurity
  The Azerbaijani-Slavic SEMIANCHUK International University
  Google Engineer cybersecurity certificate

[2003 - 2009] Master's Degree
  Kharkiv Polytechnic Institute "Kharkivskyi Politekhnichnyi Instytut"
  Electrical, Electronics and Communications Engineering
  National Technical University
  
🏆 Certifications:
  • Google Engineer Cybersecurity Certificate
  • Various professional development courses`,

    projects: `💻 Featured Projects:

1. Dark Sky PHP API Client
   Async-first PHP client for Dark Sky weather service
   Tech: PHP, APIs, Async Programming

2. Real-time Data Visualization
   D3.js + WebSockets for dynamic data filtering
   Tech: D3.js, WebSockets, Crossfilter

3. WorldPay Integration
   Complete payment gateway solution
   Tech: PHP, Payment APIs, E-commerce

4. E-commerce Platform Development
   Full-featured online store with AWS hosting
   Tech: Drupal, PHP, AWS, APIs

5. Django WebSocket System
   Real-time CRUD with validation
   Tech: Django, WebSockets, Celery, Redis

6. Social Network Posts Module
   Drupal module for social media aggregation
   Tech: Drupal, PHP, Social Media APIs

Type 'github' to see all projects!`,

    contact: `📧 Contact Information:

Email:     yurii.stenin@gmail.com
GitHub:    github.com/jorgik1
LinkedIn:  linkedin.com/in/yuriy-stenin
Location:  Poland, Andrzew

💡 Available for remote opportunities worldwide!

Type 'hire' to get started!`,

    github: () => {
      window.open('https://github.com/jorgik1', '_blank');
      return '🚀 Opening GitHub profile in new tab...';
    },

    linkedin: () => {
      window.open('https://www.linkedin.com/in/yuriy-stenin/', '_blank');
      return '🚀 Opening LinkedIn profile in new tab...';
    },

    hire: `🎯 Let's Work Together!

I'm excited about new opportunities! Here's how to reach me:

📧 Email me directly:
   yurii.stenin@gmail.com

💼 Connect on LinkedIn:
   linkedin.com/in/yuriy-stenin

🐙 Check out my work:
   github.com/jorgik1

⚡ Quick facts:
   • 10+ years of experience
   • Available for remote work
   • Full-time or contract
   • Can start immediately

Looking forward to hearing from you! 🚀`,

    date: () => new Date().toString(),

    clear: '__CLEAR__',
  };

  const processCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === 'clear') {
      setHistory([
        { type: 'output', text: 'Terminal cleared.' },
        { type: 'output', text: '' },
      ]);
      return;
    }

    if (trimmedCmd === '') {
      setHistory(prev => [...prev, { type: 'command', text: '$ ' }, { type: 'output', text: '' }]);
      return;
    }

    const output = commands[trimmedCmd];
    
    if (output) {
      const result = typeof output === 'function' ? output() : output;
      setHistory(prev => [
        ...prev,
        { type: 'command', text: `$ ${cmd}` },
        { type: 'output', text: result },
        { type: 'output', text: '' },
      ]);
    } else {
      setHistory(prev => [
        ...prev,
        { type: 'command', text: `$ ${cmd}` },
        { type: 'output', text: `Command not found: ${trimmedCmd}. Type 'help' for available commands.` },
        { type: 'output', text: '' },
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      processCommand(input);
      setInput('');
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full flex flex-col font-mono text-sm bg-black/40 backdrop-blur-sm"
    >
      {/* Terminal Output */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {history.map((item, index) => (
          <div
            key={index}
            className={`${
              item.type === 'command'
                ? 'text-green-400 font-semibold'
                : 'text-gray-300'
            } whitespace-pre-wrap`}
          >
            {item.text}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Input Line */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-green-400 font-semibold">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-white outline-none font-mono"
            placeholder="Type a command..."
            autoFocus
          />
        </div>
      </form>

      {/* Help Text */}
      <div className="px-4 pb-2 text-xs text-gray-500">
        Press Enter to execute • Type 'help' for commands
      </div>
    </motion.div>
  );
};

export default TerminalContent;
