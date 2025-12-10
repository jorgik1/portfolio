import { useState } from 'react';
import { FaSearch, FaCodeBranch, FaChevronRight, FaChevronDown, FaTimes } from 'react-icons/fa';
import { VscFiles, VscSourceControl, VscDebugAlt, VscExtensions, VscAccount, VscSettingsGear } from 'react-icons/vsc';

const VSCodeContent = () => {
  const [activeFile, setActiveFile] = useState('skills.ts');
  const [isExplorerOpen] = useState(true);

  const files = [
    { name: 'skills.ts', lang: 'typescript', icon: 'TS' },
    { name: 'experience.json', lang: 'json', icon: '{}' },
    { name: 'README.md', lang: 'markdown', icon: 'MD' }
  ];

  const codeContent: Record<string, string> = {
    'skills.ts': `interface Developer {
  name: "Yuriy Stenin";
  role: "Full Stack Developer";
  stack: {
    frontend: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Next.js"
    ];
    backend: [
      "PHP",
      "Drupal",
      "Node.js",
      "MySQL"
    ];
    tools: [
      "Git",
      "Docker",
      "AWS",
      "Figma"
    ];
  };
  focus: "Clean Code & Performance";
}`,
    'experience.json': `[
  {
    "company": "ForTorSoft",
    "role": "PHP/Drupal Developer",
    "years": "2015 - Present",
    "highlights": [
      "Led e-commerce platform development",
      "Optimized legacy code performance by 40%",
      "Mentored junior developers"
    ]
  },
  {
    "company": "NDA Learner",
    "role": "Junior Python Developer",
    "years": "2023",
    "stack": ["Django", "WebSockets", "Redis"]
  }
]`,
    'README.md': `# Portfolio v2.0

Built with:
- React 18
- Vite
- Framer Motion
- Tailwind CSS

## Interactive Features
- Draggable Windows
- Terminal Simulator
- VS Code Clone (You are here!)
- Drag & Drop Desktop

## Install
\`\`\`bash
npm install
npm run dev
\`\`\`
`
  };

  return (
    <div className="flex h-full bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm overflow-hidden select-none">
      {/* Activity Bar */}
      <div className="w-12 bg-[#333333] flex flex-col items-center py-2 gap-4 border-r border-[#1e1e1e]">
        <div className="text-2xl text-white opacity-80 cursor-pointer hover:opacity-100 border-l-2 border-white pl-3 pr-3 ml-[-2px]"><VscFiles /></div>
        <div className="text-2xl text-[#858585] cursor-pointer hover:text-white"><FaSearch /></div>
        <div className="text-2xl text-[#858585] cursor-pointer hover:text-white"><VscSourceControl /></div>
        <div className="text-2xl text-[#858585] cursor-pointer hover:text-white"><VscDebugAlt /></div>
        <div className="text-2xl text-[#858585] cursor-pointer hover:text-white"><VscExtensions /></div>
        <div className="flex-1" />
        <div className="text-2xl text-[#858585] cursor-pointer hover:text-white"><VscAccount /></div>
        <div className="text-2xl text-[#858585] cursor-pointer hover:text-white"><VscSettingsGear /></div>
      </div>

      {/* Sidebar - Explorer */}
      {isExplorerOpen && (
        <div className="w-60 bg-[#252526] flex flex-col border-r border-[#1e1e1e]">
          <div className="px-4 py-2 text-xs font-bold tracking-wider text-[#bbbbbb] flex justify-between items-center">
            <span>EXPLORER</span>
            <div className="hover:bg-[#3c3c3c] rounded p-1 cursor-pointer">•••</div>
          </div>

          <div className="px-2 py-1 flex items-center gap-1 cursor-pointer font-bold text-[#cccccc] hover:bg-[#2a2d2e]">
             <FaChevronDown className="text-xs" />
             <span className="font-bold">MACOS-PORTFOLIO</span>
          </div>

          <div className="flex flex-col">
             {files.map(file => (
               <div
                 key={file.name}
                 onClick={() => setActiveFile(file.name)}
                 className={`flex items-center gap-2 px-6 py-1 cursor-pointer ${activeFile === file.name ? 'bg-[#37373d] text-white' : 'text-[#cccccc] hover:bg-[#2a2d2e]'}`}
               >
                 <span className={`text-xs ${file.lang === 'typescript' ? 'text-blue-400' : file.lang === 'json' ? 'text-yellow-400' : 'text-gray-400'}`}>
                   {file.lang === 'typescript' ? 'TS' : file.lang === 'json' ? '{}' : 'MD'}
                 </span>
                 <span>{file.name}</span>
               </div>
             ))}
          </div>
        </div>
      )}

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col bg-[#1e1e1e]">
        {/* Tabs */}
        <div className="flex bg-[#252526] overflow-x-auto">
           {files.map(file => (
             <div
               key={file.name}
               onClick={() => setActiveFile(file.name)}
               className={`
                 flex items-center gap-2 px-3 py-2 text-xs border-r border-[#1e1e1e] cursor-pointer min-w-fit
                 ${activeFile === file.name ? 'bg-[#1e1e1e] text-white border-t-2 border-t-blue-500' : 'bg-[#2d2d2d] text-[#969696] hover:bg-[#252526]'}
               `}
             >
               <span className={`${file.lang === 'typescript' ? 'text-blue-400' : file.lang === 'json' ? 'text-yellow-400' : 'text-gray-400'}`}>
                   {file.lang === 'typescript' ? 'TS' : file.lang === 'json' ? '{}' : 'MD'}
               </span>
               <span>{file.name}</span>
               <FaTimes className={`ml-2 text-xs hover:bg-[#4b4b4b] rounded-sm p-[1px] ${activeFile === file.name ? 'opacity-100' : 'opacity-0 hover:opacity-100'}`} />
             </div>
           ))}
        </div>

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 px-4 py-1 text-xs text-[#969696] bg-[#1e1e1e] shadow-sm">
           <span>macos-portfolio</span>
           <FaChevronRight className="text-[10px]" />
           <span>src</span>
           <FaChevronRight className="text-[10px]" />
           <span className="text-white">{activeFile}</span>
        </div>

        {/* Code Area */}
        <div className="flex-1 overflow-auto p-4 font-mono text-[13px] leading-6">
           {/* Line Numbers + Code */}
           <div className="flex">
              <div className="flex flex-col text-right pr-4 text-[#858585] select-none border-r border-[#333333]">
                 {codeContent[activeFile].split('\n').map((_, i) => (
                   <span key={i} className="px-2">{i + 1}</span>
                 ))}
              </div>
              <div className="pl-4 whitespace-pre">
                {codeContent[activeFile]}
              </div>
           </div>
        </div>

        {/* Status Bar */}
        <div className="bg-[#007acc] text-white text-xs flex justify-between px-3 py-1 select-none">
           <div className="flex gap-4">
              <div className="flex items-center gap-1"><FaCodeBranch className="text-[10px]" /> main</div>
              <div className="flex items-center gap-1"><FaTimes className="text-[10px] bg-transparent rounded-full border border-white p-[1px]" /> 0</div>
              <div className="flex items-center gap-1">⚠ 0</div>
           </div>
           <div className="flex gap-4">
              <div>Ln 12, Col 34</div>
              <div>UTF-8</div>
              <div>TypeScript React</div>
              <div>Prettier</div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default VSCodeContent;
