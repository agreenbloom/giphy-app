import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Input extends Component {
    static propTypes = {
      children: PropTypes.node,
      className: PropTypes.string,
      defaultValue: PropTypes.string,
      disabled: PropTypes.bool,
      error: PropTypes.string,
      label: PropTypes.string,
      name: PropTypes.string,
      onChange: PropTypes.func,
      onKeyPress: PropTypes.func,
      required: PropTypes.bool,
      value: PropTypes.string,
    };

    static defaultProps = {
      className: '',
      disabled: false,
    };

    handleChange = (event) => {
      const { onChange} = this.props;
      const value = event.target.value;

      if (onChange) onChange(value, event);
    };

    handleKeyPress = (event) => {
      const {  onKeyPress } = this.props;

      if (onKeyPress) onKeyPress(event);
      return undefined;
    };

    blur() {
      this.inputNode.blur();
    }

    focus() {
      this.inputNode.focus();
    }

    render() {
      const {
        children, defaultValue, disabled, error, name, onKeyPress, ...others
      } = this.props;

      const inputElementProps = {
        ...others,
        onChange: this.handleChange,
        ref: (node) => { this.inputNode = node; },
        defaultValue,
        disabled,
      };

      inputElementProps.onKeyPress = this.handleKeyPress;

      return (
        <div data-react-toolbox="input">
          {React.createElement('input', inputElementProps)}
          {error ? <span className={'error'}>{error}</span> : null}
          {children}
        </div>
      );
    }
}
