# Use the official Node.js image as the base image
FROM node:20-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Create the uploads folder
RUN mkdir -p /app/uploads

# Copy the rest of the application code to the working directory
COPY . .

# Remove the tests directory
RUN rm -rf /app/tests

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]