

class FetchAndDisplayNewsItems {
    constructor(URL){
        this.URL = URL;
    }

    grabHeadlines () {
        fetch(this.state.URL)
        .then(response => { return response.json() })
        .then(newsObject => {
            let newHeadlines = []
            for (let i=0; i<10; i++) {
                newHeadlines.push(newsObject.response.results[i].webTitle)
            }
            return newHeadlines
        })
    }
