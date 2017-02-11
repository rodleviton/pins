import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route
} from 'react-router-dom';

import Pinterest from './../../utils/pinterest';
import Profile from './../../components/Profile';
import Login from './../../components/Login';

import './../../css/index.styl';
import './App.styl';

// Only allow logged in users here
const PrivateRoute = ({ component, ...rest }) => (
  <Route {...rest} render={props => (
    Pinterest.loggedIn() ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

// Determine if user is already logged in
const LoginRoute = ({ component, ...rest }) => (
  <Route {...rest} render={props => (
    Pinterest.loggedIn() ? (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    ) : (
      React.createElement(component, props)
    )
  )}/>
)

class App extends Component {
  render() {
    return (
      <Router>
        <div className="outer-wrap">

          <header className="header">
            <div className="brand">
              <a href="/" className="logo"></a>
            </div>
            <a href="https://github.com" title="Github Repo" target="_blank" className="github"></a>
          </header>

          <LoginRoute path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Profile} />

          <footer className="footer"></footer>
        </div>
      </Router>
    );
  }
}

export default App;
