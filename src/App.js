import React, { Component } from 'react';
import axios from 'axios'

import './App.css';

import Input from './components/Input/Input.component';
import Button from './components/Button/Button.component';
import List from './components/List/List.component';

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
    })

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
      this.setState({gifs: newData})
      this.setState({
        isLoading: false,
        displayTitle: this.state.query
      })
    })
  }

  loadMoreGifs = (direction) => {

    const { offset } = this.state;
    let offsetAmount;

    if(direction === 'next') {
      offsetAmount = offset + 25;
    } else {
      offsetAmount = offset - 25;
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

  compareValues = (key, order='asc') => {
    return function(a, b) {


      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          return 0;
      }

      const varA = (typeof a[key] === 'string') ?
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ?
        b[key].toUpperCase() : b[key];
      console.log('a', varA);
      console.log('b', varB)
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }



  sortByRating = () => {
    this.setState({
      isLoading: true,
    })
    let { gifs } = this.state;

    const gifsWRating = gifs.filter(g => g.rating)
    const gifsWOutRating = gifs.filter(g => !g.rating);
    const sortedWRatings = gifsWRating.sort(this.compareValues(gifsWRating));
    const sortedGifs = sortedWRatings.concat(gifsWOutRating);

    this.setState({
      gifs: sortedGifs
    });
    this.setState({
      isLoading: false,
    })
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

          {isLoading && <p> loading </p>}

          {!isLoading && <List gifs={gifs} handleRatingClick={this.handleImageRating}/>}

          {query.length > 0 && this.showPaginationButtons()}

        </div>
      </div>
    );
  }
}

export default App;
