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
      store: [],
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
      title: result.title,
      rating: result.rating,
      timeTrending: result.trending_datetime,
    })))
    .then(newData => {
      this.setState({gifs: newData, store: newData})

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

    const { offset, isLoading } = this.state;

    this.setState({
      isLoading: true
    })

    axios.get(`${API_URL}?q=${this.state.query}&limit=15&api_key=${API_KEY}&offset=${offset}`)
    .then(resp => resp.data.data.map(result => ({
      slug: result.slug,
      id: result.id,
      preview: result.images.preview_gif.url,
      src: result.images.downsized_large.url,
      title: result.title,
      rating: result.rating,
      timeTrending: result.trending_datetime,
    })))
    .then(newData => {
      this.setState({gifs: newData})
      this.searchTerm = '';
      this.setState({
        isLoading: false
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

    this.searchGiphy('hello')
  }

  showPaginationButtons= () => {
    const { offset } = this.state;
    return(
      <React.Fragment>
        <div onClick={() => { this.loadMoreGifs('next')}}> More </div>
        { offset ? <div onClick={() => { this.loadMoreGifs('back')}}> Back </div> : null }
      </React.Fragment>
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
    })
  }

  render() {
    const { gifs, query, offset, isLoading} = this.state;

    return (
      <div className="App">
        <div className="Card">
          <div className="header">NAME LIST</div>
          <Input type='text' label='Gifs' name='query' value={this.state.query} onChange={this.handleChange} maxLength={16 } />

          <Button handleClick={this.searchGiphy} >
            Search
          </Button>

          <Button handleClick={this.sortByDate}>
            Sort By Date
          </Button>

          {isLoading && <p> loading </p>}

          {!isLoading && <List gifs={gifs}/>}

          {query.length > 0 && this.showPaginationButtons()}

        </div>
      </div>
    );
  }
}

export default App;
