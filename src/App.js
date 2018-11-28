import React, { Component } from 'react';
import axios from 'axios'

import './App.css';

import Input from './components/Input/Input.component';
import Button from './components/Button/Button.component';
import List from './components/List/List.component';
import Spinner from './components/Spinner/Spinner.component';

const API_URL = 'http://api.giphy.com/v1/gifs/search';
const API_KEY = 'Mb6qpsLotHxYjpxVHGS9a1WWt0nRcepJ';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      gifs: [],
      query: '',
      offset: 0,
      isLoading: false,
    }
  }


  componentDidMount() {

    this.setState({
      isLoading: true
    });

    axios.get(`http://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&rating=g`)
    .then(resp => resp.data.data.map(result => ({
      slug: result.slug,
      id: result.id,
      preview: result.images.preview_gif.url,
      src: result.images.downsized_large.url,
      caption: result.title,
      timeTrending: result.trending_datetime,
    })))
    .then(newData => {
      this.setState({gifs: newData,})

      this.setState({
        isLoading: false
      });
    })
    .catch(error => alert(error))
  }

  handleChange = (value, e) => {
    this.setState({ query: value });
  };

  searchGiphy = () => {

    const { offset } = this.state;

    this.setState({
      isLoading: true
    });

    axios.get(`${API_URL}?q=${this.state.query}&limit=15&api_key=${API_KEY}&offset=${offset}`)
    .then(resp => resp.data.data.map(result => ({
      slug: result.slug,
      id: result.id,
      preview: result.images.preview_gif.url,
      src: result.images.downsized_large.url,
      caption: result.title,
      timeTrending: result.trending_datetime,
    })))
    .then(newData => {
      console.log('newData', newData)
      this.setState({
        gifs: newData,
        isLoading: false,
        displayTitle: this.state.query
      })
    })
  }

  loadMoreGifs = (direction) => {

    const { offset, gifs } = this.state;
    let offsetAmount;

    if(direction === 'next') {
      offsetAmount = offset + gifs.length;
    } else {
      offsetAmount = offset - gifs.length;
    }

    this.setState({ offset: offsetAmount});

    this.searchGiphy()
  }

  showPaginationButtons= () => {
    const { offset } = this.state;
    return(
      <div className="showMoreContainer">
      { offset ? <Button handleClick={() => { this.loadMoreGifs('back')}}> Back </Button> : null }
        <Button handleClick={() => { this.loadMoreGifs('next')}}> More </Button>
      </div>
    )
  }

  sortByDate = () => {
    const { gifs } = this.state;

    const gifsByTrendingDate = gifs.sort((a, b) => {
      let dateA = new Date(a.timeTrending), dateB = new Date(b.timeTrending);
      return dateA - dateB;
    });

    this.setState({
      gifs: gifsByTrendingDate
    });
  }


  handleImageRating = (img) => {
    this.setState({
      shouldShowRating: true
    });

    Object.keys(this.state.gifs).map(i => {
      if (img.id === i.id) this.setState({i: img,})
    });
  }

  render() {
    const { gifs, query, isLoading, displayTitle} = this.state;

    return (
      <div className="App">
        <div className="container">
          <h1 className="title">{displayTitle ? `${displayTitle} Gifs` : 'Trending Gifs'}</h1>
          <div className="inputContainer">
            <Input
              type='text'
              label='Gifs'
              name='query'
              value={this.state.query}
              onChange={this.handleChange}
              onKeyPress={this.searchGiphy}
              handleOnEnter={true}
            />

            <Button handleClick={this.searchGiphy} >
              Search
            </Button>

            <Button handleClick={this.sortByDate}>
              Sort By Trending Date
            </Button>

          </div>

          {isLoading && <Spinner />}

          {!isLoading && <List gifs={gifs} handleRatingClick={this.handleImageRating}/>}

          {query.length > 0 && this.showPaginationButtons()}

        </div>
      </div>
    );
  }
}

export default App;
