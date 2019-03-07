const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require("fs")

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

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
    let id = req.body.id;
    let moderator = req.body.moderator;
    let categories = req.body.categories;
    res.json(
        {
            "result":"OK"
        }
    );
    saveInfo(id, moderator,categories);
});


function saveInfo(id, moderator,categories){
    let write = true;
    let obj = {
        moderator: moderator,
        categories: categories
    }
    console.log(obj);
    var data = JSON.parse(fs.readFileSync("public/sentences.json").toString());
    data.sentences.forEach(function (sentence){
        if(sentence.id === id)
        {
           sentence.votes.forEach(function(phrase){
               if(phrase.moderator === moderator){
                   write=false;
               }
           })
            if(write===true) {
                sentence.votes.push(obj);
            }
           return;
        }
    });
    fs.writeFile("public/sentences.json", JSON.stringify(data), function(err, result) {
        if(err) console.log('error', err);
    });
}

function readJsonFileSync(filepath, encoding){
    let file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}


