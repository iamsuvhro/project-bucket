FROM nginx:1.19.0-alpine

ARG NGINX_CONF_TYPE

RUN rm /etc/nginx/conf.d/default.conf
COPY ${NGINX_CONF_TYPE} /etc/nginx/conf.d