import React from 'react';
import PropTypes from 'prop-types';

const StarIcon = ({ height, width, colour , stroke }) => (
  <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
    <path fill={colour} stroke={stroke} d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"/>
  </svg>
);

StarIcon.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  colour: PropTypes.string,
  stroke: PropTypes.string,
};

StarIcon.defaultProps = {
  height: 60,
  width: 55,
  colour: 'none',
  stroke: '#000',
};


export default StarIcon;
