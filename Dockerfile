# Base Image
FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm i

# Copy rest of the application code
COPY . .

# Build the app
# RUN npm run build

# Start the app
CMD ["npm", "run", "dev"]

# Expose port
EXPOSE 3333

