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

  handleOnClick = () => {

    this.props.handleClick();
  };

  render() {
    const { handleClick, children} = this.props;

    return (
      <button  onClick={this.handleOnClick}>
        {children}
      </button>
    );
  }
}
export default Button;
