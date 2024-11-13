# Aprameya Production

## Welcome to Aprameya Production!
This website showcases short movies produced by Aprameya Production, offering a seamless viewing experience with a modern frontend built using React and TypeScript, and a powerful backend running on Node.js.

## Project Overview
Aprameya Production is a platform for showcasing short films and videos. The project consists of two main parts:

### Frontend
- Built with **React**, **TypeScript**, and **Vite**, providing a fast and responsive user interface.

### Backend
- Powered by **Node.js** (with **Express** or another framework) for handling API requests, user authentication, and serving movie data.

## Project Structure

\`/Aprameya-Production\`
├── \`/frontend\`            # React + TypeScript + Vite frontend
├── \`/backend\`             # Node.js backend for handling API requests
└── \`README.md\`            # This file
" > README.md

# Step 1: Clone the repository (if you haven't already)
echo "Welcome to Aprameya Production Setup!"

# Create the main project folder
mkdir Aprameya-Production
cd Aprameya-Production

# Step 2: Initialize Git
git init

# Step 3: Create frontend folder and initialize it with Vite
echo "Setting up the frontend (React + TypeScript + Vite)..."
mkdir frontend
cd frontend
npm create vite@latest . --template react-ts
npm install

# Step 4: Configure Tailwind CSS (Optional)
echo "Setting up Tailwind CSS for the frontend..."

# Install Tailwind CSS dependencies
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Create tailwind.config.js file with the necessary settings
echo "module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}" > tailwind.config.js

# Add Tailwind directives to the global CSS file (index.css or any CSS file)
echo "@tailwind base;
@tailwind components;
@tailwind utilities;" > src/index.css

# Step 5: Go back to the root folder and set up the backend
cd ..
mkdir backend
cd backend

# Initialize Node.js project
npm init -y

# Install backend dependencies (Express)
npm install express

# Step 6: Basic backend setup (Express Example)
echo "Setting up the Backend..."

# Create a simple Express server
echo "const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Welcome to Aprameya Production API!');
});

app.get('/movies', (req, res) => {
  const movies = [
    { title: 'Movie 1', description: 'This is the description for movie 1.' },
    { title: 'Movie 2', description: 'This is the description for movie 2.' }
  ];
  res.json(movies);
});

app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});
" > server.js

# Step 7: Add a basic package.json for the backend with dev script
echo '{
  "scripts": {
    "start": "node index.js"
  }
}' > package.json

# Step 9: Create root .gitignore file
echo "Setting up .gitignore..."
cd ..
echo "
# Node.js dependencies
node_modules/

# Build output
/dist/
/build/

# Vite cache
.vite/

# TypeScript files
*.tsbuildinfo
*.d.ts
*.js

# Environment files
.env
.env.*.local

# IDE/editor folders
.vscode/
.idea/

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS-specific files
.DS_Store
Thumbs.db

# Optional: Lock files (uncomment if needed)
# package-lock.json
# yarn.lock
" > .gitignore

# Step 10: Create README.md for the project
echo "Creating README.md file..."

echo "
# Step 11: Final messages
echo "Aprameya Production setup is complete!"
echo "To start the project, run the following commands:"

echo "1. Navigate to the frontend folder and run: npm run dev"
echo "2. In a new terminal window, navigate to the backend folder and run: npm run dev"
echo "Both servers will be running on http://localhost:3000 (frontend) and http://localhost:5000 (backend)."

# End of the script
