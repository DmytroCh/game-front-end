# => Build container
FROM node:13.12.0-alpine as builder

# Create app directory
WORKDIR /app

# install app dependencies
COPY package.json .
COPY package-lock.json .
COPY . .
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm run build

# => Run container
FROM nginx:1.15.2-alpine

# Nginx config
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# Static build
COPY --from=builder /app/build /usr/share/nginx/html/

EXPOSE 3000

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY .env .

# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x env.sh

# Start Nginx server
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
