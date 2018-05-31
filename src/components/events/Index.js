import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class EventsIndex extends React.Component{

  state = {
    events: []

  }

  componentDidMount(){
    axios.get('/api/events')
      .then(res => this.setState({ events: res.data }, () => console.log(this.state)));
  }

  render(){
    console.log('render', this.state);
    return(
      <div className="columns is-multiline">
        <h1 className="userShowtitle">Check out these other Stand Up Soirées</h1>
        {this.state.events.map(event =>
          <div className="column is-one-third-desktop is-half-tablet" key={event._id}>
            <Link to={`/events/${event._id}`}>
              <div className="card userShowCard">
                <div
                  className="card-image"
                  style={{ backgroundImage: `url(${event.gig.image})` }}
                ></div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4">{event.eventName}</p>
                      <p className="subtitle is-6">{event.gig.name}</p>
                      <p className="subtitle is-6">{event.gig.venue}</p>
                      <p className="subtitle is-6">{event.gig.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>


          </div>
        )}

      </div>
    );
  }

}


export default EventsIndex;
