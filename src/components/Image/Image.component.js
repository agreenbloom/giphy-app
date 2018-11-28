import React, {Component} from 'react'
import PropTypes from 'prop-types';

export default class Image extends Component {
  static propTypes = {
    handleToggleLightbox: PropTypes.func,
    index: PropTypes.number
  };



  render() {
    const { gif, index, handleToggleLightbox } = this.props;
  
    return(
      <div className="imageContainer">
        <a
          href={gif.preview}
          key={index}
          onClick={handleToggleLightbox.bind(this, index)}
          className="card"
        >
          <img src={gif.preview}  alt=''/>
        </a>

      </div>
    )
  }
}
