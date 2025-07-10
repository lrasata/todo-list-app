# Dockerfile

# Base image - # Use an official Node.js LTS image
FROM node:20-alpine AS base
# Set working directory inside the container
WORKDIR /app
# Copy package files and install deps first (use cache efficiently)

COPY package*.json ./
RUN npm install

# Production build
FROM base AS production
COPY . .
# Expose the port your app runs on
EXPOSE 8080
# Start the app
CMD ["node", "src/server.js"]

# Development build
FROM base AS development
RUN npm install --global nodemon
COPY . .
# Expose the port your app runs on
EXPOSE 8080
CMD ["nodemon", "--legacy-watch", "--watch", "src", "src/server.js"]
