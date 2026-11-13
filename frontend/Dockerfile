# Use an unprivileged Nginx image with a pinned version
FROM nginxinc/nginx-unprivileged:1.28-alpine

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static frontend files
COPY src/ /usr/share/nginx/html/

# Explicitly run as the non-root Nginx user
USER 101

# Nginx listens on port 8080
EXPOSE 8080

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
