import React, {Component} from 'react'
import Lightbox from 'react-images';

export default class List extends Component {

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
		this.setState({
			currentImage: this.state.currentImage - 1,
		});
	}

	gotoNext = () => {
		this.setState({
			currentImage: this.state.currentImage + 1,
		});
	}

	gotoImage = (index) => {
		this.setState({
			currentImage: index,
		});
	}

	handleClickImage = () => {
		if (this.state.currentImage === this.props.gifs.length - 1) return;

		this.gotoNext();
	}

  renderGallery = () => {
		const { gifs } = this.props;

		if (!gifs) return;

		const gallery = gifs.map((img, i) => {
			return (
				<a
					href={img.preview}
					key={i}
					onClick={(e) => this.openLightbox(i, e)}
				>
					<img src={img.preview}  alt={img.title}/>
				</a>
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

    return(
      <React.Fragment>
        {this.renderGallery()}
        <Lightbox
					currentImage={this.state.currentImage}
					images={gifs}
					isOpen={this.state.lightboxIsOpen}
					onClickImage={this.handleClickImage}
					onClickNext={this.gotoNext}
					onClickPrev={this.gotoPrevious}
					onClose={this.closeLightbox}
				/>
      </React.Fragment>
    )
  }
}
