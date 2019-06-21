
## Available Scripts

In the project directory, you can run:

### `docker-compose up -d`

Creates 5 different containers that includes respectively:

- Apache
- Php
- Node
- Mysql
- PhpMyAdmin

## Configure Php
Run 

```bash 
docker ps
``` 

```bash
CONTAINER ID        IMAGE                               
e85159e1149c        moderazione_php
```
and copy the "CONTAINER ID" of the container named "moderazione_php" (In this case "e85159e1149c")

Install composer inside container by running:

```bash
docker exec -it "CONTAINER_ID" ./start.sh
```
Remember to paste and overwrite "CONTAINER_ID".

this command let you install composer, update schema and add fixtures to database.

Open http://localhost:3000 and if the page is loading, you configured correctly the php container.

Run test by running:
```bash
 ./testphp.sh
 ```

## Container PhpMyAdmin
Open http://localhost:9000 to view it in the browser.

## Container Node
Open http://localhost:3000 to view it in the browser.

Run test by running:
```bash
./testreact.sh
 ```
 Where CONTAINER_ID is the ID of the container "moderazione_app"

## Configure Keyboard's Button
In AbuseArea.jsx, in the render method, there is a component called "KeyboardEventHandler".

Modify property "handleKeys" to handle keyboard's button

In the method "handleKeyboardEvent", separate the keys according to their scope.
- if => clickButton
- else => clickItem
