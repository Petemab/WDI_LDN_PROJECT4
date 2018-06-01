import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';



class ProfileShow extends React.Component{

  state = {
    event: null
  }


  componentDidMount() {
    console.log(this.props);
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }));

  }

  handleDelete = () => {
    axios.delete(`/api/users/${this.props.match.params.id}`,{
      headers: {Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.props.history.push('/events'));
  }

  render(){

    const { user } = this.state;
    console.log('render', user);
    if(!this.state.user) return null;

    return(
      <div className="container">

        <h1 className="title has-text-white">{user.username}&apos;s Profile</h1>
        <div className="columns is-multiline">
          <div className="column is-half">
            <div className="card userShowCard">
              <div
                className="card-image"
                style={{ backgroundImage: `url(${user.image})` }}
              >
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">{ user.username }</p>
                    <p className="subtitle is-6">{user.email}</p>
                    <p><strong>My favourite comics are: </strong></p>
                    {user.faveComedians.map((faveComedian, index) =>
                      <li key={index}>
                        <p>{faveComedian[index]}</p>
                      </li>
                    )}
                    <button className="button is-danger is-small is-rounded showButton" onClick={this.handleDelete}>Delete My Profile</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half-desktop" >
            <h2 className="userShowtitle has-text-white">{ user.username }&apos;s Stand Up Soirées</h2>
            <div className="columns is-multiline">
              {user.events.map(event =>
                <div className="column is-one-third" key={event._id}>
                  <Link to={`/events/${event._id}`}>
                    <div key={event._id} className="card userShowEventCard">
                      <div
                        className="card-image userEventCardImg"
                        style={{ backgroundImage: `url(${event.gig.image})` }}
                      />
                    </div>
                    <p>{event.eventName}</p>
                    <p>{event.gig.date}</p>
                  </Link>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>



    );
  }





}

export default ProfileShow;
