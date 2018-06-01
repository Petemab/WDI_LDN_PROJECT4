import React from 'react';
import axios from 'axios';
import Map from '../common/Map';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import CommentForm from './CommentForm';


class EventsShow extends React.Component{

state = {
  comment: {}
}


componentDidMount() {
  axios.get(`/api/events/${this.props.match.params.id}`)
    .then(res => this.setState({ event: res.data }, () => console.log('======>',this.state.event)));
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
  console.log(comment);
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
    <div className="columns is-multiline">

      <div className="column is-half">
        <h1 className="userShowtitle">{event.eventName}</h1>
        <div className="card userShowCard">
          <div
            className="card-image"
            style={{ backgroundImage: `url(${event.gig.image})` }}
          >
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{ event.gig.name }</p>
                <p className="subtitle is-5">Venue: {event.gig.venue}</p>
                <p className="subtitle is-5">Address: {event.gig.address}</p>
                <p className="subtitle is-5">Date: {event.gig.date}</p>
                <p className="subtitle is-5">Doors: {event.gig.startTime}.00</p>
                <p className="subtitle is-5">£{event.gig.entryprice}</p>
                <p className="subtitle is-6">{event.gig.description}</p>
                <p className="subtitle is-6">{event.gig.acts[0]}</p>
                <Link to={`/users/${event.user}`}>
                  <p className="subtitle is-6">Click <strong>here</strong> to see more events created by this user</p>
                </Link>
                <Link to={'/events/new/'}
                  className="button is-black is-rounded showButton"
                >Not Happy? Organise another!</Link>
                <button className="button is-danger is-rounded showButton" onClick={this.handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="column is-half">

        {event.pub &&
            <div className="card pubShowCard">
              <div
                className="card-image"
                style={{ backgroundImage: `url(${event.pub.image})` }}
              >
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">Let&apos;s meet here for a drink first!</p>
                    <hr/>
                    <p className="subtitle is-6">{event.pub.name}</p>
                    <p className="subtitle is-6">{event.pub.address}</p>
                    <hr/>
                    <Map className="map" center={event.gig.location} pubMarker={event.pub.location}/>
                  </div>
                </div>
              </div>
            </div>
        }
      </div>
      <div className="column is-half is-centered is-offset-one-quarter">
        <ul>
          {event.comments.map(comment =>
            <li key={comment._id}>
              <p>{comment.user.username}</p>
              <p className="title is-6">{comment.text}</p>
              {/* will need to add the conditional back in once I've worked out why it's not working */}
              {Auth.isCurrentUser(comment.user) &&
              <button className="button is-danger is-rounded is-small"
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


    </div>
  );

}

}

export default EventsShow;
