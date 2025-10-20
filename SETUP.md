# 🚀 Quick Start Guide - macOS Portfolio

## Setup Instructions

### 1. Navigate to Project Directory
```bash
cd ~/Projects/macos-portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

Your portfolio will be available at `http://localhost:5173`

---

## 🎨 Customization Guide

### Update Personal Information

#### 1. About Me Section
Edit: `src/components/windows/AboutContent.tsx`
- Change name, title, and description
- Update skills and technologies
- Adjust skill levels

#### 2. Projects Section
Edit: `src/components/windows/ProjectsContent.tsx`
- Add/remove projects
- Update project descriptions
- Change project links

#### 3. Contact Information
Edit: `src/components/windows/ContactContent.tsx`
- Update email address
- Change social media links
- Customize contact form

#### 4. Dock Links
Edit: `src/components/Dock.tsx`
- Update GitHub URL (line 11)
- Update LinkedIn URL (line 12)
- Add more app icons if needed

---

## 🎯 Important URLs to Update

Search and replace these placeholders:

1. **GitHub URL**: `https://github.com/yourusername`
   - Found in: `Dock.tsx` and `ProjectsContent.tsx`

2. **LinkedIn URL**: `https://linkedin.com/in/yourusername`
   - Found in: `Dock.tsx` and `ContactContent.tsx`

3. **Email**: `your.email@example.com`
   - Found in: `ContactContent.tsx`

4. **Twitter**: `@yourusername` and URL
   - Found in: `ContactContent.tsx`

---

## 🎨 Color Customization

Edit: `tailwind.config.js`

Change the gradient colors in the main App:
- Edit: `src/App.tsx` (lines with `bg-gradient-to-br`)

---

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

---

## 🌐 Deploy to Vercel

### Option 1: Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option 2: GitHub + Vercel Dashboard
1. Push code to GitHub
2. Go to vercel.com
3. Import your repository
4. Deploy!

---

## 🐛 Troubleshooting

### Issue: Port already in use
```bash
# Kill the process using the port
lsof -ti:5173 | xargs kill -9
# Or use a different port
npm run dev -- --port 3000
```

### Issue: Module not found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Tech Stack

- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Icons** - Icon Library

---

## 🎓 Learn More

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Guide](https://www.framer.com/motion/)

---

## ✨ Features

✅ macOS-inspired design with glassmorphism
✅ Draggable windows
✅ Interactive dock with hover effects
✅ Smooth animations
✅ Responsive design
✅ TypeScript for type safety
✅ Easy to customize
✅ Production-ready

---

Happy coding! 🎉
