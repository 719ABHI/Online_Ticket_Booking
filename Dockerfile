# Use Node.js 18 base image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all files (including HTML, JS, CSS, etc.)
COPY . .

# Expose the port your server uses (make sure it matches your server)
EXPOSE 3003

# Start your Node.js backend server
CMD ["node", "indexserver.js"]
    