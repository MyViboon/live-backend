# Specify a base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy app source code
COPY . .

# Expose port 3000
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
