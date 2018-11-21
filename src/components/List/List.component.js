import React, {Component} from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Rating from '../Rating/Rating.component.js';
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
      isRatingVisible: false,
		};
  }

  onMouseEnter = () => {
    this.setState({ isRatingVisible: true });
  };

  onMouseLeave = () => this.setState({ isRatingVisible: false });


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
    const { isRatingVisible } = this.state;

    const componentClass = classNames("ratingContainer", {
      ["showItemsHover"]: isRatingVisible,
    });

		if (!gifs) return;

		const gallery = gifs.map((img, i) => {
			return (
        <div className="imageContainer" key={i} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
  				<a
  					href={img.preview}
  					key={i}
  					onClick={(e) => this.openLightbox(i, e)}
            className="card"
  				>
  					<img src={img.preview}  alt=''/>
  				</a>
          <div className={componentClass} >
            <Rating starsSelected={img.rating ? img.rating : 0} handleOnClick={this.handleRatingClick.bind(this, i)}/>
          </div>
        </div>
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
