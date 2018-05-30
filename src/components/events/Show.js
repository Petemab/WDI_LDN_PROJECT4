import React from 'react';
import axios from 'axios';
import Map from '../common/Map';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import CommentForm from './CommentForm';


class EventsShow extends React.Component{

state = {
  event: null,
  comment: {}
}


componentDidMount() {
  console.log(this.props);
  axios.get(`/api/events/${this.props.match.params.id}`)
    .then(res => this.setState({ event: res.data }));
}

handleDelete = () => {
  axios.delete(`/api/events/${this.props.match.params.id}`,{
    headers: {Authorization: `Bearer ${Auth.getToken()}` }
  })
    .then(() => this.props.history.push('/events'));
}

handleCommentChange = ({ target: { name, value } }) => {
  const comment = { ...this.state.comment, [name]: value };
  this.setState({ comment: comment });
}

handleCommentSubmit = (e) => {
  e.preventDefault();
  const { id } = this.props.match.params;
  axios.post(`/api/events/${id}/comments`, this.state.comment, {
    headers: { Authorization: `Bearer ${Auth.getToken()}`}
  })
    .then(res => this.setState({ event: res.data, comment: {} }));
}

handleCommentDelete = (comment) => {

  const { id } = this.props.match.params;
  axios
    .delete(`/api/events/${id}/comments/${comment._id}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
    .then(res => this.setState( { event: res.data }));
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
      {event.pub &&
        <div>
          <h3>Pub</h3>
          <p>{event.pub.name}</p>
          <img src={`${event.pub.image}`}/>
          <p>{event.pub.address}</p>
          <Map className="map" center={event.gig.location} markers={event.pub.location}/>
        </div>
      }
      <Link to={`/events/${event._id}/edit`}
        className="button"
      >Edit</Link>
      <button className="button is-danger" onClick={this.handleDelete}>Delete</button>
      <ul>
        {event.comments.map(comment =>
          <li key={comment._id}>
            <p>{comment.user.username}</p>
            <p className="title is-6">{comment.text}</p>
            {/* will need to add the conditional back in once I've worked out why it's not working */}
            {Auth.isCurrentUser(comment.user) &&
            <button className="button is-danger"
              onClick={() => this.handleCommentDelete(comment)}
            >Delete</button>
            }
            <hr />
          </li>
        )}
      </ul>
      {Auth.isAuthenticated() && <CommentForm
        handleChange={this.handleCommentChange}
        handleSubmit={this.handleCommentSubmit}
        comment={this.state.comment}
      />}

    </div>
  );

}

}

export default EventsShow;
