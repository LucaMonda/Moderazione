FROM php:7.2.7-fpm-alpine3.7
RUN apk update; \
    apk upgrade; \
    apk add bash
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN docker-php-ext-install mysqli pdo_mysql
WORKDIR /var/www