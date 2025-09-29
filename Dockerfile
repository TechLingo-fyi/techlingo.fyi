# Use Node.js 20 Alpine as base image for smaller size
FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /app

# Copy package files
COPY package*.json ./

# Clean install all dependencies (including dev dependencies needed for build)
RUN npm install -g npm@11.6.1 && \
    rm -rf node_modules package-lock.json && \
    npm cache clean --force && \
    npm install

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application (skip type checking in Docker build)
RUN npm run astro build

# Export stage for extracting built files
FROM scratch AS exporter
COPY --from=builder /app/dist /
