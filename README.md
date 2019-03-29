
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


### `docker-compose up -d`

Creates 3 different containers that contain respectively:

- Php
- Mysql
- PhpMyAdmin


## container Php
Open http://localhost:8000 to view it in the browser.

## container PhpMyAdmin
Open http://localhost:8080 to view it in the browser.

## Configure Keyboard's Button
In AbuseArea.jsx, in the render method, there is a component called "KeyboardEventHandler".
Modify property "handleKeys" to handle keyboard's button.
In the method "handleKeyboardEvent", separate the keys according to their scope.
- if => clickButton
- else => clickItem
