import React, { Component } from 'react';
import axios from 'axios'

import './App.css';

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
    .then(resp => console.log(resp.data.data))
  }

  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
