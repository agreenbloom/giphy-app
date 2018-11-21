import React, { Component } from 'react';
import PropTypes from "prop-types";

import Star from '../Star/Star.component.js';

import "./styles.css";

class Rating extends Component {

  static propTypes = {
    totalStars: PropTypes.number,
    starsSelected: PropTypes.number,
    handleOnClick: PropTypes.func,
  };

  static defaultProps = {
    totalStars: 5
  };

  constructor(props) {
    super(props);
    this.state = {
      starsSelected: this.props.starsSelected || 0
    };
  }

  change = (starsSelected) => {
    this.setState({ starsSelected: starsSelected });
    if(this.props.handleOnClick) this.props.handleOnClick(starsSelected)
  }

  render() {
    console.log('this.props', this.props.starsSelected)
    const { totalStars } = this.props;
    const { starsSelected } = this.state;
    
    return (
      <div className="star-rating">
        {[...Array(totalStars)].map((n, i) => (
          <Star
            key={i}
            selected={i < starsSelected}
            onClick={() => this.change(i + 1)}
          />
        ))}

      </div>
    );
  }
}

export default Rating;
