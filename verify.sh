#!/bin/bash
# Verification script for AI Learning Platform

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting verification of AI Learning Platform deployment...${NC}"

# Function to check if a URL is accessible
check_url() {
  local url=$1
  local description=$2
  echo -e "\nChecking $description at $url..."
  
  if command -v curl &> /dev/null; then
    if curl -s --head "$url" | grep "200 OK" > /dev/null; then
      echo -e "${GREEN}✓ $description is accessible${NC}"
      return 0
    else
      echo -e "${RED}✗ $description is not accessible${NC}"
      return 1
    fi
  else
    echo -e "${YELLOW}! curl not available, please check $description manually${NC}"
    return 2
  fi
}

# 1. Verify backend API
echo -e "\n${YELLOW}Step 1: Verifying backend API...${NC}"
echo "Please enter your backend URL (e.g., https://ai-learning-platform-api.onrender.com):"
read backend_url
check_url "$backend_url" "Backend API"

# 2. Verify frontend
echo -e "\n${YELLOW}Step 2: Verifying frontend...${NC}"
echo "Please enter your frontend URL (e.g., https://ai-learning-platform.netlify.app):"
read frontend_url
check_url "$frontend_url" "Frontend"

# 3. Verify authentication
echo -e "\n${YELLOW}Step 3: Verifying authentication endpoints...${NC}"
check_url "$backend_url/api/auth" "Authentication API"

# 4. Verify courses
echo -e "\n${YELLOW}Step 4: Verifying courses endpoints...${NC}"
check_url "$backend_url/api/courses" "Courses API"

# 5. Verify responsive design
echo -e "\n${YELLOW}Step 5: Verifying responsive design...${NC}"
echo "Please check the frontend on different devices or using browser developer tools"
echo "to ensure the responsive design works correctly."

# 6. Verify user registration and login
echo -e "\n${YELLOW}Step 6: Verifying user registration and login...${NC}"
echo "Please test the registration and login functionality on the frontend"
echo "to ensure users can create accounts and log in successfully."

echo -e "\n${GREEN}Verification checklist complete!${NC}"
echo "Please address any issues identified during verification before considering the deployment complete."
