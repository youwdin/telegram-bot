# Use newer Node version that matches requirements
FROM node:22.12-slim

# Set working directory
WORKDIR /app

# Install dependencies for native modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install ALL dependencies (bot needs them)
RUN npm install

# Copy application files
COPY . .

# Set environment to production
ENV NODE_ENV=production

# Expose port (optional, for health checks)
EXPOSE 3000

# Start the bot
CMD ["npm", "run", "bot"]
