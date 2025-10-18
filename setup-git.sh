#!/bin/bash

echo "🚀 Setting up Git integration for AI Sales Suite..."

# Create a new GitHub repository using GitHub CLI or manual setup
echo "📝 Creating GitHub repository..."

# Initialize git if not already done
if [ ! -d ".git" ]; then
    git init
fi

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: AI Sales Suite with B&D logo and chatbot widget"

echo "✅ Git repository ready!"
echo ""
echo "🔗 Next steps:"
echo "1. Go to https://github.com/new"
echo "2. Create a repository named 'ai-sales-suite'"
echo "3. Copy the repository URL"
echo "4. Run: git remote add origin <YOUR_REPO_URL>"
echo "5. Run: git push -u origin main"
echo "6. Run: npx vercel git connect <YOUR_REPO_URL>"
echo ""
echo "🎯 This will enable automatic deployments on every git push!"
