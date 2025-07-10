# Use an official Node.js LTS image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files and install deps first (use cache efficiently)
COPY package*.json ./
RUN npm install --production

# Copy the rest of the app
COPY . .

# Expose the port your app runs on
EXPOSE 8080

# Start the app
CMD [ "node", "server.js" ]
