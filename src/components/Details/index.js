import React, { Component } from 'react';
import './Details.styl';

class Details extends Component {
  render() {
    return (
      <section>
        <h1 className="h1">Rod Leviton</h1>
        <h3 className="h3">Developer <span style={{ color: '#fc1151' }}>+</span> Designer</h3>
      </section>
    );
  }
}

export default Details;
