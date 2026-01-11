#!/bin/bash

# Build the project
echo "Building project..."
npm run build

# Copy CNAME to dist
echo "Copying CNAME..."
cp public/CNAME dist/CNAME

# Deploy to gh-pages
echo "Deploying to GitHub Pages..."
gh-pages -d dist

echo "Deployment complete!"


