const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require("fs");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

app.listen(3100, () => {
    console.log("Server running on port 3100");
});

app.get("/sentence", (req, res) => {
    let response = getNextSentence();
    res.json(response);
});

app.post("/sentence", (req, res) => {
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
    let obj = {
        moderator: moderator,
        categories: categories
    };
    const data = JSON.parse(fs.readFileSync("public/sentences.json").toString());
    data.sentences.filter((sentence) => sentence.id === id).map((sentence) => sentence.votes.push(obj));
    fs.writeFile("public/sentences.json", JSON.stringify(data), function(err) {
        if(err) console.log('error', err);
    });
}


function getNextSentence(){
    let string = "stringa-fissa@da-cambiare.it";
    let response = "";
    let write = "";
    let i = 1;

    const data = JSON.parse(fs.readFileSync("public/sentences.json").toString());
    do {
        if(i-1===data.sentences.length){
            break;
        }
        write = true;
        data.sentences.find(sentence => sentence.id == i).votes.filter((vote) => vote.moderator === string).map(function(){
            write=false;
        });
        response = data.sentences.find(sentence => sentence.id == i);
        i++;
    }while(write==false);
    return write == true? response : [];
}
