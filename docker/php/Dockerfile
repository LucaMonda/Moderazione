FROM php:7.2-apache

RUN a2enmod headers rewrite

# set correct document root
ENV APACHE_DOCUMENT_ROOT /var/www/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# set timezone
RUN printf '[PHP]\ndate.timezone = "Europe/Rome"\n' > /usr/local/etc/php/conf.d/timezone.ini

RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

COPY 000-default.conf /etc/apache2/sites-available/000-default.conf
COPY apache2.conf /etc/apache2/apache2.conf

# setup composer
RUN apt-get update && \
    apt-get install -y --no-install-recommends git unzip zlib1g-dev
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# install php extension
RUN docker-php-ext-install -j$(nproc) zip pdo pdo_mysql sockets

WORKDIR /var/www
