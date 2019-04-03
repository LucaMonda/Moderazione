FROM php:7.2-fpm
RUN apt-get update && \
    apt-get install -y vim procps zlib1g-dev coreutils zlib1g mysql-client supervisor
RUN docker-php-ext-configure pdo_mysql --with-pdo-mysql
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-configure zip
RUN docker-php-ext-install zip
COPY conf/supervisord.conf /etc/supervisor/supervisord.conf
COPY conf/run.sh /usr/local/bin/run.sh
RUN curl -sS https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer
RUN chmod a+x /usr/local/bin/composer
RUN useradd ideato
RUN mkdir /var/log/supervisord
RUN mkdir -p /var/www && chown -R ideato:ideato /var/www
USER ideato
COPY ./php /var/www
WORKDIR /var/www
CMD ["supervisord", "-n"]
