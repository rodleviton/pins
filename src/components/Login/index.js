import React, { Component } from 'react';
import Pinterest from './../../utils/pinterest';
import './Login.styl';
import Details from './../Details';

class Login extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  /*
   *  Login using Pinterest OAuth
   */
  pinLogin() {
    Pinterest.login(() => {
      // Navigate to profile
      this.context.router.push('/');
    });
  }

  render() {
    return (
      <div className="masthead">
        <Details />
        <button className="btn-default" onClick={this.pinLogin.bind(this)}>Log in</button>
      </div>
    );
  }
}

export default Login;
