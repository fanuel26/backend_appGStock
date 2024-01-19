# Base Image
FROM node:16-alpine

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm i

# Copy rest of the application code
COPY . .

# Build the app
# RUN npm run build

# Expose port
EXPOSE 3333

# Set execute permissions for the entrypoint script
# RUN chmod +x entrypoint.sh

# Set the entry point to the script
# ENTRYPOINT ["./entrypoint.sh"]

# Start the app
CMD ["npm", "run", "dev"]
