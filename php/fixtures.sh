#!/bin/sh

php bin/console doctrine:schema:update --force
yes | php bin/console doctrine:fixtures:load