class Sentence {

    constructor(){
        this.id = null;
        this.author = "";
        this.content = "";
        this.indicators = "";
    }

    getSentence(cb){
        return fetch('http://localhost:8080/index.php/sentence',{
            mode: 'cors',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                this.id = data.id;
                this.author = data.author;
                this.content = data.content;
                this.indicators = data.indicators;
                let disable = data.length === 0;
                cb(disable);
                this.transition(data.length===0? "rgba(255,0,0, 0.3)":"rgba(135,206,235, 0.3)");
            })
    }

    sendSentence(clickedItems) {
        const obj = {
            id: this.id,
            moderator: "moderator1@gmail.com",
            categories: clickedItems
        };
        return fetch('http://localhost:8080/index.php/sentence',{
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body:  JSON.stringify(obj)
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                if(data.result !== "OK"){
                    console.log("Problem with the server.");
                }
            });
    }

    transition(color){
        let sentence = document.getElementById('text');
        sentence.style.backgroundColor = color;
        setTimeout(function() {
            sentence.style.backgroundColor = 'white';
        }, 600);
    }

    getId(){
        return this.id;
    }

    getAuthor(){
        return this.author;
    }

    getContent(){
        return this.content;
    }

    getIndicators(){
        return this.indicators;
    }

}

export default Sentence