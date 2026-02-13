#!/bin/bash
# deploy.sh
echo "Deploying to GitHub..."
git remote set-url origin https://github.com/tamanna2311/Tamanna.git
git branch -M main
git push -u origin main
echo "If asked for a password, please use your Personal Access Token."
