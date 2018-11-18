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
    }
  }


  componentDidMount() {
    axios.get(`http://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&rating=g`)
    .then(resp => resp.data.data.map(result => ({
      slug: result.slug,
      id: result.id,
      preview: result.images.preview_gif.url,
      original: result.images.original.url,
      title: result.title,
      rating: result.rating,
    })))
    .then(newData => {
      this.setState({gifs: newData, store: newData})
    })
    .catch(error => alert(error))
  }


  getInfo = () => {
    axios.get(`${API_URL}?q=${this.state.query}&limit=15&api_key=${API_KEY}`)
    .then(resp => resp.data.data.map(result => ({
      slug: result.slug,
      id: result.id,
      preview: result.images.preview_gif.url,
      original: result.images.original.url,
      title: result.title,
      rating: result.rating,
    })))
    .then(newData => {
      this.setState({gifs: newData})
    })
  }

  handleChange = (value, e) => {
    console.log('value', value)

    this.setState({ query: value });
    console.log('this.state.query', this.state.query);
  };

  searchGiphy = () => {
    axios.get(`${API_URL}?q=${this.state.query}&limit=15&api_key=${API_KEY}`)
    .then(resp => resp.data.data.map(result => ({
      slug: result.slug,
      id: result.id,
      preview: result.images.preview_gif.url,
      original: result.images.original.url,
      title: result.title,
      rating: result.rating,
    })))
    .then(newData => {
      this.setState({gifs: newData})
      this.searchTerm = '';
    })
  }

  render() {
    const { gifs, query} = this.state;
    console.log('query.', query)
    return (
      <div className="App">
        <div className="Card">
          <div className="header">NAME LIST</div>
          <Input type='text' label='Gifs' name='query' value={this.state.query} onChange={this.handleChange} maxLength={16 } />

          <Button handleClick={this.searchGiphy} >
            Search
          </Button>

          <List gifs={gifs}/>
        </div>
      </div>
    );
  }
}

export default App;
