import React, { Component } from 'react';
import axios from 'axios'

import './App.css';

import SearchBar from './components/SearchBar/SearchBar.component'
import List from './components/List/List.component'


class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      gifs: [],
      store: []
    }
  }


  componentDidMount() {
    axios.get('http://api.giphy.com/v1/gifs/trending?api_key=Mb6qpsLotHxYjpxVHGS9a1WWt0nRcepJ&rating=g')
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


  render() {
    const { gifs} = this.state;

    return (
      <div className="App">
        <div className="Card">
          <div className="header">NAME LIST</div>
          <SearchBar/>
          <List gifs={gifs}/>
        </div>
      </div>
    );
  }
}

export default App;
