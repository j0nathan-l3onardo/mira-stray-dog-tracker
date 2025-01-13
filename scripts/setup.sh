
# Install npm packages
npm install @headlessui/react framer-motion clsx

# Check if npm install was successful
if [ $? -ne 0 ]; then
  echo "npm install failed"
  exit 1
fi