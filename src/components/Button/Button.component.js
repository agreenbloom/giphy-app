import React, { Component } from 'react';

import PropTypes from 'prop-types';

class Button extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    handleClick: PropTypes.func, 
  };

  static defaultProps = {
    disabled: false,
    onClick: null,
  };

  handleOnClick = (e) => {
    this.props.handleClick(e);
  };

  render() {
    const { children} = this.props;

    return (
      <button  onClick={this.handleOnClick}>
        {children}
      </button>
    );
  }
}
export default Button;
