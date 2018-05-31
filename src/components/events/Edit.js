import React from 'react';
import EventForm from './Form';
import axios from 'axios';
import Auth from '../../lib/Auth';

class EventsEdit extends React.Component {
  state = {
    errors: {},
    event: {}
  };
  //to get the burger by id:
  componentDidMount() {
    axios.get(`/api/events/${this.props.match.params.id}`)
      // .then(res => this.setState( { event: res.data } ));
      .then(res => console.log(res.data));
  }

  //desctructures the e event to pass it as an argument
  handleChange = ({ target: { name, value } }) => {
    const errors = {...this.state.errors, [name]: '' };
    this.setState({ errors, [name]: value });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { id } = this.props.match.params;
    axios.put(`/api/events/${id}`, this.state, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.props.history.push(`/events/${id}`))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    if(Object.keys(this.state).length === 0) return null;
    return <EventForm
      event={this.state.event}
      handleChange={this.handleChange}
      handleSubmit={this.handleSubmit}
      errors={this.state.errors}
    />;
  }
}

export default EventsEdit;
