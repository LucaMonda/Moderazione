
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


### `docker-compose up -d`

Creates 3 different containers that includes respectively:

- Php
- Mysql
- PhpMyAdmin

## Configure Php
Run 

```bash 
docker ps
``` 

```bash
CONTAINER ID        IMAGE                               
e85159e1149c        react-app_php_1
```
and copy the "CONTAINER ID" of the container named "react_app_php" (In this case "e85159e1149c")

Install composer inside container by running:

```bash
docker run -it CONTAINER_ID composer install
```
Remember to paste and overwrite "CONTAINER_ID".

After that run:

```bash
docker run -it CONTAINER_ID /var/www/start.sh
```

this command let you update schema and add fixtures to database.

Open http://localhost:3000 and if the page is loading, you configured correctly the php container.

Run test by running:
```bash
 docker run -it CONTAINER_ID /var/www/bin/phpunit
 ```

## Container PhpMyAdmin
Open http://localhost:8080 to view it in the browser.

## Configure Keyboard's Button
In AbuseArea.jsx, in the render method, there is a component called "KeyboardEventHandler".

Modify property "handleKeys" to handle keyboard's button

In the method "handleKeyboardEvent", separate the keys according to their scope.
- if => clickButton
- else => clickItem
