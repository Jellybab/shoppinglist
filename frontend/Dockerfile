# Use Node.js base image for ARM64 architecture
FROM docker.io/node:latest AS build-env
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy source files and build the application
COPY . ./

RUN npm install react-router-dom
RUN npm run build

# Build runtime image
FROM docker.io/nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy built files from build environment
COPY --from=build-env /app/dist .

# Expose port 80
EXPOSE 80

# Command to run nginx
CMD ["nginx", "-g", "daemon off;"]
