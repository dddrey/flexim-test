#!/bin/bash

echo "Installing dependencies for backend..."
cd backend || exit
npm install

if [ ! -f .env.local ]; then
  cp .env.example .env.local
  echo ".env.local file created and filled with values from .env.example"
else
  echo ".env.local already exists, skipping creation"
fi

echo "Returning to project root..."
cd ..

echo "Installing dependencies for frontend..."
cd frontend || exit
npm install

if [ ! -f .env.local ]; then
  cp .env.example .env.local
  echo ".env.local file created and filled with values from .env.example"
else
  echo ".env.local already exists, skipping creation"
fi

echo "Returning to project root..."
cd ..

echo "Dependencies installed and .env.local files created. You can now start the projects."