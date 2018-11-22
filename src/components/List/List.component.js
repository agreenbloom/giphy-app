import React, {Component} from 'react'
import PropTypes from 'prop-types';

import Image from '../Image/Image.component.js';
import Lightbox from 'react-images';

import "./styles.css";

export default class List extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    handleRatingClick: PropTypes.func,
  };

  constructor () {
		super();

		this.state = {
			lightboxIsOpen: false,
			currentImage: 0,
		};
  }


  openLightbox = (index, event) => {
		event.preventDefault();
		this.setState({
			currentImage: index,
			lightboxIsOpen: true,
		});
	}

	closeLightbox = () => {
		this.setState({
			currentImage: 0,
			lightboxIsOpen: false,
		});
	}

	gotoPrevious = () => {
    const currentImage = this.state.currentImage - 1;
		this.setState({
			currentImage,
		});
	}

	gotoNext = () => {
    const currentImage = this.state.currentImage + 1;
		this.setState({
			currentImage,
		});
	}

	handleClickImage = () => {
		if (this.state.currentImage === this.props.gifs.length - 1) return;
		this.gotoNext();
	}

  handleRatingClick = (i, rating ) => {
    let currentImage = this.props.gifs[i];
    currentImage["rating"] = rating;

    if(this.props.handleRatingClick) this.props.handleRatingClick(currentImage)
  }

  renderGallery = () => {
		const { gifs } = this.props;

		if (!gifs) return;

		const gallery = gifs.map((img, i) => {
			return (
        <React.Fragment>
          <Image gif={img} key={i} index={i} handleRatingClick={this.handleRatingClick} handleToggleLightbox={this.openLightbox}/>
        </React.Fragment>
			);
		});

		return (
			<div className={'gallery'}>
				{gallery}
			</div>
		);
	}

  render() {
    const { gifs } = this.props;
    const { currentImage, lightboxIsOpen } = this.state;

    return(
      <React.Fragment>
        {this.renderGallery()}
        <Lightbox
					currentImage={currentImage}
					images={gifs}
					isOpen={lightboxIsOpen}
					onClickImage={this.handleClickImage}
					onClickNext={this.gotoNext}
					onClickPrev={this.gotoPrevious}
					onClose={this.closeLightbox}

				/>
      </React.Fragment>
    )
  }
}
