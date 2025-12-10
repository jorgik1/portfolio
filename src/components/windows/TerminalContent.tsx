import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { portfolioConfig } from '../../data/portfolio';

const TerminalContent = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ type: 'command' | 'output', text: string }>>([
    { type: 'output', text: 'Welcome to Yuriy\'s Terminal v1.0.0' },
    { type: 'output', text: 'Type "help" for available commands' },
    { type: 'output', text: '' },
  ]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, string | (() => string)> = {
    help: portfolioConfig.terminal.welcome + '\n\nAvailable commands:\n\n' + Object.keys(portfolioConfig.terminal.commands).join(', ') + ', date, clear, help',

    whoami: portfolioConfig.terminal.commands.whoami,
    about: portfolioConfig.terminal.commands.about,
    skills: portfolioConfig.terminal.commands.skills,
    experience: portfolioConfig.terminal.commands.experience,
    education: portfolioConfig.terminal.commands.education,
    projects: portfolioConfig.terminal.commands.projects,
    contact: portfolioConfig.terminal.commands.contact,
    hire: portfolioConfig.terminal.commands.hire,

    github: () => {
      window.open(portfolioConfig.personal.github, '_blank');
      return '🚀 Opening GitHub profile in new tab...';
    },

    linkedin: () => {
      window.open(portfolioConfig.personal.linkedin, '_blank');
      return '🚀 Opening LinkedIn profile in new tab...';
    },

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
            aria-label="Terminal Input"
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
