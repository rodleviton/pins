import React, { Component } from 'react';
import ReactMixin from 'react-mixin'
import firebase from 'firebase';
import ReactFireMixin from 'reactfire';
import Pinterest from './../../utils/pinterest';
import Card from './../Card';
import Notification from './../Notification';
import Details from './../Details';

firebase.initializeApp({
  apiKey: "AIzaSyAA4lVYbIkwVQnWIbMq4qfe8KM7OpQVrj4",
  databaseURL: "https://rotoheni-648dc.firebaseio.com"
});

class Profile extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      pins: [],
      metadata: [],
      user: {},
      notification: ''
    };
  }

  componentWillMount() {
    const ref = firebase.database().ref('pins');
    this.bindAsArray(ref, 'metadata');
  }

  // Poor mans notification system
  startNotifications() {
    const notifications = [
      {
        delay: 3000,
        message: `Hello, ${this.state.user.first_name}.`
      },
      {
        delay: 6000,
        message: `This site will share a little bit about me.`
      },
      {
        delay: 10000,
        message: `It was built using the Pinterest API and enhanced with additional metadata that is stored in a NoSQL database.`
      },
      {
        delay: 4000,
        message: `I hope you enjoy.`
      },
      {
        delay: 4000,
        message: `Peace. 🕊`
      }
    ];

    let i = 0;

    const setNotification = (index) => {
      if(index < notifications.length) {
        this.setState({
          notification: notifications[index].message
        });

        setTimeout(() => {
          setNotification(i++)
        }, notifications[index].delay);
      }
    }

    setNotification(i);
  }

  componentWillUnmount() {
    this.unbind('metadata');
  }

  /*
   *  Fetch remote data from Instagram and Pinterest
   */
  componentDidMount() {
    this.fetchPinData();
    this.fetchUserData();
  }

  fetchPinData() {
    Pinterest.getPins('rotoheni', response => {
      this.setState({ pins: response.data });
    });
  }

  fetchUserData() {
    Pinterest.getUser(response => {
      this.setState({ user: response.data });

      setTimeout(() => {
        this.startNotifications();
      }, 2000);
    })
  }

  _renderPin(pin) {
    return (
      <Card key={pin.id} pin={pin} metadata={this.state.metadata} />
    );
  }

  goToLinkedIn() {
    window.open('https://au.linkedin.com/in/rod-leviton-a1329b17', '_blank');
  }

  render() {
    return (
      <section>
        {
          (this.state.notification) ?
            <Notification user={this.state.user} message={this.state.notification} />
          : ''
        }
        <div className="masthead">
          <Details />
          <button className="btn-default" onClick={this.goToLinkedIn.bind(this)}>Contact</button>
        </div>

        <main className="card-grid">
        {
          this.state.pins.sort((a, b) => {
            const aMetadata = this.state.metadata.find((item) => {
              return item['.key'] === a.id;
            });

            const bMetadata = this.state.metadata.find((item) => {
              return item['.key'] === b.id;
            });

            return (aMetadata && bMetadata) ? (aMetadata.priority > bMetadata.priority) ? 1 : -1 : -1;
          }).map(this._renderPin.bind(this))
        }
        </main>
      </section>
    );
  }
}

ReactMixin(Profile.prototype, ReactFireMixin)

export default Profile;
