import React, { Component } from 'react'
import axios from 'axios'


const API_URL = 'http://api.giphy.com/v1/gifs/search';
const API_KEY = 'Mb6qpsLotHxYjpxVHGS9a1WWt0nRcepJ';

class SearchBar extends Component {
  state = {
    query: '',
    results: []
  }

  setSearchTerm(e) {
    const searchTerm = e.target.value;
    console.log('seac', e.target.value);

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

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo()
        }
      }
    })
  }

  render() {
    return (
      <form>
        <input
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />

      </form>
    )
  }
}

export default SearchBar
