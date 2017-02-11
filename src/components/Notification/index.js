import React, { Component } from 'react';
import './Notification.styl'

class Notification extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      classes: 'notification animated',
      message: ''
    };
  }

  _getAvatar() {
    return this.props.user.image ? this.props.user.image['60x60'].url : '';
  }

  componentWillMount() {
    this.setState(
      {
        classes: 'notification animated fadeInUpBig',
        message: this.props.message
      }
    );

    this.cleanupTimer = setTimeout(() => {
      this.setState({ classes: 'notification animated fadeOutUpBig' });
    }, 15000);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.message !== this.props.message) {
      clearTimeout(this.cleanupTimer);

      this.setState({ classes: 'notification animated fadeOutUpBig' });

      setTimeout(() => {
        this.setState({
          classes: 'notification animated fadeInUpBig',
          message: this.props.message
        });
      }, 400);

      this.cleanupTimer = setTimeout(() => {
        this.setState({ classes: 'notification animated fadeOutUpBig' });
      }, 15000);
    }
  }

  render() {
    return (
      <div className={ this.state.classes }>
        <img src={this._getAvatar()} alt="Avatar" />
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default Notification;
