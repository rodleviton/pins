import React, { Component } from 'react';
import ImageLoader from './ImageLoader';
import './Card.styl'

class Card extends Component {
  constructor(props, context) {
    super(props, context);
    console.log(props);
  }

  _getMetadata() {
    const metadata = this.props.metadata.find((item) => {
      return item['.key'] === this.props.pin.id
    });

    return metadata || {};
  }

  goToPin() {
    window.open(this.props.pin.url, '_blank');
  }

  _isLoading() {
    const metadata = this.props.metadata.find((item) => {
      return item['.key'] === this.props.pin.id
    });

    return metadata ? '' : 'loading';
  }

  render() {
    return (
      <div className={`card ${this._isLoading()}`} key="{this.props.pin.id}">
        <div className="card-header">
          <ImageLoader image={this.props.pin.image.original.url} classes="card-header-hero" description="Hero Image" />
          <div className="avatar">
            <ImageLoader image="https://bit.ly/2avTw7Y" description="Avatar" />
          </div>

          <div className="badge">{this._getMetadata().tag}</div>
        </div>

        <div className="card-content">
          <h5>{this._getMetadata().category}</h5>
          <h2>{this._getMetadata().title}</h2>
          <p>{this._getMetadata().description}</p>
          <button className="btn-card" onClick={this.goToPin.bind(this)}>View</button>
        </div>

        <div className="card-footer">
          <div className="card-action">
            <button className="likes" onClick={this.goToPin.bind(this)}></button>
            <div className="counter"><div className="arrow"></div>{this.props.pin.counts.likes}</div>
          </div>
          <div className="card-action">
            <button className="comments" onClick={this.goToPin.bind(this)}></button>
            <div className="counter"><div className="arrow"></div>{this.props.pin.counts.comments}</div>
          </div>
        </div>

      </div>
    );
  }
}

export default Card;
