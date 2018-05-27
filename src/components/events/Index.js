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
      <div>
        <h1>This is the Index page for events</h1>
        {this.state.events.map(event =>
          <div key={event._id}>
            <Link to={`/events/${event._id}`}>
              <p>{event.eventName}</p>
              <p>{event.gig.name}</p>
              <img src={`${event.gig.image}`}/>
              <p>{event.gig.venue}</p>
              <p>{event.gig.date}</p>
            </Link>


          </div>
        )}

      </div>
    );
  }

}


export default EventsIndex;
