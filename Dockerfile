# Dockerfile for Next.js
FROM node:18-alpine

# Set working directory
WORKDIR /src/app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
