import React, { Component } from 'react';

class ImageLoader extends Component {
  componentDidMount() {
    this.image.classList.add('loading');
    this.image.setAttribute('src', this.props.image);

    this.image.onload = () => {
      this.image.classList.remove('loading');
  	};
  }

  render() {
    return (
      <img ref={(image) => { this.image = image; }} className={this.props.classes} alt={this.props.desription} />
    );
  }
}

export default ImageLoader;
