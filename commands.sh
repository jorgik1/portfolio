#!/bin/bash

# macOS Portfolio - Quick Commands Reference
# Make this file executable: chmod +x commands.sh

echo "🎨 macOS Portfolio - Quick Commands"
echo "===================================="
echo ""

# Check if in correct directory
if [ ! -f "package.json" ]; then
    echo "⚠️  Please run this from the project root directory"
    exit 1
fi

show_menu() {
    echo "Choose an option:"
    echo "1) Install dependencies"
    echo "2) Start development server"
    echo "3) Build for production"
    echo "4) Preview production build"
    echo "5) Deploy to Vercel"
    echo "6) Clean install (remove node_modules)"
    echo "7) Check for updates"
    echo "8) Lint code"
    echo "0) Exit"
    echo ""
}

while true; do
    show_menu
    read -p "Enter choice: " choice
    echo ""
    
    case $choice in
        1)
            echo "📦 Installing dependencies..."
            npm install
            ;;
        2)
            echo "🚀 Starting development server..."
            npm run dev
            ;;
        3)
            echo "🏗️  Building for production..."
            npm run build
            ;;
        4)
            echo "👀 Previewing production build..."
            npm run preview
            ;;
        5)
            echo "🌐 Deploying to Vercel..."
            if command -v vercel &> /dev/null; then
                vercel
            else
                echo "⚠️  Vercel CLI not installed. Install with: npm i -g vercel"
            fi
            ;;
        6)
            echo "🧹 Cleaning and reinstalling..."
            rm -rf node_modules package-lock.json
            npm install
            ;;
        7)
            echo "🔍 Checking for updates..."
            npm outdated
            ;;
        8)
            echo "🔍 Linting code..."
            npm run lint
            ;;
        0)
            echo "👋 Goodbye!"
            exit 0
            ;;
        *)
            echo "❌ Invalid choice. Please try again."
            ;;
    esac
    
    echo ""
    read -p "Press Enter to continue..."
    clear
done
