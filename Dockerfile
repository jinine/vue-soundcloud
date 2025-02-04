# Node.js image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the entire project
COPY . .

# Build the Nuxt.js project
RUN npm run build

# Expose port 
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]

#  docker build --no-cache -t vue-soundcloud .
#  docker run -d -p 3000:3000 --name vue-soundcloud vue-soundcloud