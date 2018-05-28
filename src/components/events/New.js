import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import EventForm from './Form';



class EventsNew extends React.Component{

state = {
  errors: {},
  gigs: {}
}

//desctructures the e event to pass it as an argument
handleChange = ({ target: { name, value } }) => {
  const errors = {...this.state.errors, [name]: '' };
  this.setState({ errors, [name]: value });

}

//function to make the axios request to get gig info - need to change the call backs
findGigs = (e) => {
  e.preventDefault();
  axios
    .get('http://www.skiddle.com/api/v1/events/search/',{
      params: {
        api_key: 'da5309460b3745c052e5b81db46975f1',
        latitude: 51.5074,
        longitude: 0.1277,
        radius: 7,
        eventcode: 'COMEDY',
        description: 1,
        minDate: '2018-06-02',
        maxDate: '2018-07-02'
      }
    })
    .then(res => this.setState({ gigs: res.data }, () =>
      console.log(this.state)));
}

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
        findGigs={this.findGigs}
      />

    </div>


  );


}


}

export default EventsNew;
