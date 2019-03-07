var express = require("express");
var cors = require('cors');

var app = express();

app.use(cors());

app.listen(3100, () => {
    console.log("Server running on port 3100");
});

app.get("/sentence", (req, res, next) => {
    res.json(
        {
            "id":"1",
            "content":"Se parli così è perchè non capisci un cazzo come tutti i ginecologi!",
            "author":"rado"
        }
    );
});

app.post("/sentence", (req, res, next) => {
    console.log("sentence received");
    res.json(
        {
            "result":"OK"
        }
    );
});


