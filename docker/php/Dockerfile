FROM php:7.2-fpm-alpine
RUN apk update && \
    apk add zlib-dev mysql-client
RUN docker-php-ext-configure pdo_mysql --with-pdo-mysql
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-configure zip
RUN docker-php-ext-install zip
RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer
RUN chmod a+x /usr/local/bin/composer
RUN adduser ideato -D
USER ideato
#COPY ./php /var/www
#RUN cd /var/www && /usr/local/bin/composer install
WORKDIR /var/www