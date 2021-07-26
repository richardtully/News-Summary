import React, { Component } from 'react'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
require('dotenv').config()

class NewsGrabber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headlines: [],
            thumbnails: [],
            articleSummarys: [],
            displayArticleSummarys: [],
            images:[],
            URL: 'https://content.guardianapis.com/search?show-fields=thumbnail,body&api-key='+ process.env.REACT_APP_API_KEY
        }
    }

    headlineAndThumbnailList = () => {

        const headlineAndThumbnailList = this.state.headlines.map((headline,index) =>
            <div class="flexbox-content">
                <img  onClick = {e => this.displayArticleSummaryText(e.target.id)} id={`news-thumbnail-${index}`} key={`image-for-${headline}`} src = {this.state.thumbnails[index]}></img>
                <h3  id={`news-item-${index}`} key={headline} >{headline}</h3>
                <div  class="flexbox-content-2" id={`news-text-${index}`} > {ReactHtmlParser(this.state.displayArticleSummarys[index])} </div>     
            </div>
            )
        return(<div class='flexbox-container'>{headlineAndThumbnailList}</div>)
    }

    grabHeadlinesAndThumbnails () {
        fetch(this.state.URL)
        .then(response => { return response.json() })
        .then(newsObject => {
            console.log(newsObject.response.results[0].webUrl)
            let newHeadlines = []
            let newThumbnails = []
            let newArticleSummarys =[]
            for (let i=0; i<10; i++) {
                newHeadlines.push(newsObject.response.results[i].webTitle)
                newThumbnails.push(newsObject.response.results[i].fields.thumbnail)
                newArticleSummarys.push(newsObject.response.results[i].fields.body)
            }
            return [newHeadlines, newThumbnails, newArticleSummarys]
        })
        .then(newThings => {
            this.setState({headlines: newThings[0]})
            this.setState({thumbnails: newThings[1]}) 
            this.setState({articleSummarys: newThings[2]})
    })
    }

    displayArticleSummaryText (x) {
       let index = parseInt(x.charAt(x.length-1))
       let newDisplayArticleSummarys = []
       this.state.articleSummarys.map(article => {newDisplayArticleSummarys.push('')} )
       newDisplayArticleSummarys[index] = this.state.articleSummarys[index]
       console.log(newDisplayArticleSummarys)
       this.setState({displayArticleSummarys: newDisplayArticleSummarys})



       // this.setState({displayArticleSummarys: this.state.newArticleSummarys})
       console.log(index)

    }

    componentDidMount() {
        this.grabHeadlinesAndThumbnails()
    }

    render(){
        return(
            <div>
                {this.headlineAndThumbnailList()}
            </div>
        )
    }
}

export default NewsGrabber