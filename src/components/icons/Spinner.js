import React from 'react';
import PropTypes from 'prop-types';

const SpinnerIcon = ({ height, width, colour, strokeWidth, radius, stroke }) => (
<svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" fill="none" stroke-linecap="round" r={radius} stroke-width={strokeWidth} stroke={stroke} stroke-dasharray="62.83185307179586 62.83185307179586" transform="rotate(1.99877 50 50)">
    <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="2.8s" begin="0s" repeatCount="indefinite"></animateTransform>
  </circle>
</svg>
);

SpinnerIcon.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  colour: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  radius: PropTypes.number,
};

SpinnerIcon.defaultProps = {
  height: 160,
  width: 155,
  colour: 'none',
  stroke: '#93dbe9',
  strokeWidth: 6,
  radius: 40,
};


export default SpinnerIcon;
