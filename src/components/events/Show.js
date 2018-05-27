import React from 'react';
import axios from 'axios';


class EventsShow extends React.Component{

state = {
  event: null
}


componentDidMount() {
  console.log(this.props);
  axios.get(`/api/events/${this.props.match.params.id}`)
    .then(res => this.setState({ event: res.data }));

}

render(){
  const { event } = this.state;
  console.log('render', event);
  if(!this.state.event) return null;

  return(
    <div>
      <h1>This will be the event show page</h1>
      <p>{event.eventName}</p>
      <p>{event.gig.name}</p>
      <img src={`${event.gig.image}`} />
      <p>{event.gig.venue}</p>
      <p>{event.gig.address}</p>
      <p>{event.gig.date}</p>
      <p>{event.gig.startTime}</p>
      <p>{event.gig.entryprice}</p>
      <p>{event.gig.description}</p>
      <p>{event.gig.acts[0]}</p>
      <h3>Pub</h3>
      <p>{event.pub.name}</p>
      <img src={`${event.pub.image}`}/>
      <p>{event.pub.address}</p>


    </div>
  );

}

}

export default EventsShow;
