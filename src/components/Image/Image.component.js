import React, {Component} from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Rating from '../Rating/Rating.component.js';


export default class Image extends Component {
  static propTypes = {
    handleRatingClick: PropTypes.func,
  };


  constructor () {
    super();

    this.state = {
      isRatingVisible: false,
    };
  }


  onMouseEnter = () => this.setState({ isRatingVisible: true });

  onMouseLeave = () => this.setState({ isRatingVisible: false });


  render() {
    const { gif, index, handleRatingClick, handleToggleLightbox } = this.props;
    const { isRatingVisible } = this.state;

    const componentClass = classNames("ratingContainer", {
      "showItemsHover": isRatingVisible,
    });

    return(
      <div className="imageContainer" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <a
          href={gif.preview}
          key={index}
          onClick={handleToggleLightbox.bind(this, index)}
          className="card"
        >
          <img src={gif.preview}  alt=''/>
        </a>
        <div className={componentClass} >
          <Rating starsSelected={gif.rating ? gif.rating : 0} handleOnClick={handleRatingClick.bind(this, index)}/>
        </div>
      </div>
    )
  }
}
