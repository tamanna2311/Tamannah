#!/bin/bash

# 1. Explanation
echo "--------------------------------------------------------"
echo "🔐 GITHUB AUTHENTICATION HELPER"
echo "--------------------------------------------------------"
echo "Since I cannot log in for you, you need to provide a temporary 'Personal Access Token'."
echo ""
echo "👉 STEP 1: Click this link (Command+Click) to create a token:"
echo "   https://github.com/settings/tokens/new?scopes=repo&description=TamannaTributeDeploy"
echo ""
echo "👉 STEP 2: Scroll down and click 'Generate token'."
echo ""
echo "👉 STEP 3: Copy the token (starts with 'ghp_')."
echo "--------------------------------------------------------"

# 2. Prompt for Token
read -s -p "Paste the token here (input will be hidden): " TOKEN
echo ""

if [ -z "$TOKEN" ]; then
    echo "❌ Error: Token cannot be empty."
    exit 1
fi

# 3. Configure Remote and Push
echo "🔄 Configuring remote..."
git remote set-url origin https://tamanna2311:$TOKEN@github.com/tamanna2311/Tamanna.git

echo "🚀 Pushing code to GitHub..."
git push -u origin main

echo "--------------------------------------------------------"
echo "✅ SUCCESS! The website code is on GitHub."
echo "🔗 View it here: https://tamanna2311.github.io/Tamanna/"
echo "(Note: Ensure GitHub Pages is enabled in Settings > Pages)"
echo "--------------------------------------------------------"
