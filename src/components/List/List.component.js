import React, {Component} from 'react'
// import Loading from './Loading'

const List = (props) =>{
  const { gifs } = props

  return(
    <ul>
      { gifs.map(gif => <img alt={gif.title} src={gif.preview} key={gif.id} />) }
    </ul>
  )
}

export default List
