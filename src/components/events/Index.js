import React from 'react';
import axios from 'axios';


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
        {/* {this.state.events.map(event =>
          <div key={event._id}>
            <p>{event.name}</p>
            <p>{event.gig.name}</p>
            <p>{event.gig.venue}</p>


          </div>
        )} */}

      </div>
    );
  }

}


export default EventsIndex;
