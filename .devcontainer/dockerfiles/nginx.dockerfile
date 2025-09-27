FROM nginx:1.29.1

# Copy custom config
COPY ./config/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /var/www/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
