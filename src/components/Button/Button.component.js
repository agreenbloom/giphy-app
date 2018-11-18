import React, { Component } from 'react';

import PropTypes from 'prop-types';

class Button extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    handleClick: PropTypes.func, // was handleOnClick
  };

  static defaultProps = {
    disabled: false,
    onClick: null,
  };

  constructor(props) {
    super(props);
    console.log('props', props)
  }

  handleClick = e => {
    console.log('props', this.props)
    this.props.handleClick(e);
  };

  render() {
    const { handleClick, children} = this.props;

    return (
      <button  onClick={this.handleClick}>
        {children}
      </button>
    );
  }
}
export default Button;
