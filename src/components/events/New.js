import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import EventForm from './Form';



class EventsNew extends React.Component{

state = {
  errors: {}
}

//desctructures the e event to pass it as an argument
handleChange = ({ target: { name, value } }) => {
  const errors = {...this.state.errors, [name]: '' };
  this.setState({ errors, [name]: value });

}

// findGigs = (this.state.event.date, )
  

handleSubmit = e => {
  e.preventDefault();
  axios.post('/api/events', this.state, {
    headers: { Authorization: `Bearer ${Auth.getToken()}` }
  })
    .then(() => this.props.history.push('/users/:id'))
    .catch(err => this.setState({ errors: err.response.data.errors }));
}

render(){
  return(
    <div>
      <h1>This will be the create new event page</h1>
      <EventForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        event={this.state}
      />

    </div>


  );


}


}

export default EventsNew;
