#!/bin/bash
# Deployment script for AI Learning Platform

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting deployment of AI Learning Platform...${NC}"

# 1. Deploy database to Supabase
echo -e "\n${YELLOW}Step 1: Deploying database to Supabase...${NC}"
echo "This step requires manual setup in the Supabase dashboard:"
echo "1. Create a new project in Supabase"
echo "2. Get the PostgreSQL connection string"
echo "3. Run the schema.sql script in the SQL Editor"
echo -e "${GREEN}Database deployment instructions prepared.${NC}"

# 2. Deploy backend to Render
echo -e "\n${YELLOW}Step 2: Deploying backend to Render...${NC}"
echo "This step requires manual setup in the Render dashboard:"
echo "1. Create a new Web Service"
echo "2. Connect to your Git repository"
echo "3. Set the build command to 'npm install'"
echo "4. Set the start command to 'node server.js'"
echo "5. Add environment variables from .env.production"
echo -e "${GREEN}Backend deployment instructions prepared.${NC}"

# 3. Deploy frontend to Netlify
echo -e "\n${YELLOW}Step 3: Deploying frontend to Netlify...${NC}"
echo "This step requires manual setup in the Netlify dashboard:"
echo "1. Create a new site from Git"
echo "2. Connect to your Git repository"
echo "3. Set the publish directory to 'frontend'"
echo "4. Set environment variables if needed"
echo -e "${GREEN}Frontend deployment instructions prepared.${NC}"

# 4. Update API URL in frontend
echo -e "\n${YELLOW}Step 4: Updating API URL in frontend...${NC}"
echo "After deployment, update the API_URL in main.js to point to your Render backend URL"
echo -e "${GREEN}API URL update instructions prepared.${NC}"

echo -e "\n${GREEN}Deployment instructions complete!${NC}"
echo "Follow these instructions to deploy your AI Learning Platform."
echo "After deployment, verify that all components are working correctly."
