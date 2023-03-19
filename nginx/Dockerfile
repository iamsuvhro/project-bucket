FROM nginx:1.21.1-alpine

# Copy custom nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
