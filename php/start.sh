#!/bin/sh

composer install
php bin/console doctrine:schema:update --force
yes | php bin/console doctrine:fixtures:load

