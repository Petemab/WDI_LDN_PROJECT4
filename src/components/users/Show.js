import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



class UsersShow extends React.Component{

  state = {
    event: null
  }


  componentDidMount() {
    console.log(this.props);
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }));

  }

  render(){

    const { user } = this.state;
    console.log('render', user);
    if(!this.state.user) return null;

    return(
      <div className="container">

        <h1 className="title has-text-white">My Profile</h1>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half-desktop" >
            <div className="columns">
              {/* <div className="column is-one-third">

              </div> */}

              <div className="column is-one-third">
                <h2 className="subtitle has-text-white">{ user.username }&apos;s Stand Up Soirées</h2>
                {user.events.map(event =>
                  <div key={event._id}>
                    <Link to={`/events/${event._id}`}>
                      <div key={event._id} className="card userShowEventCard">
                        <div
                          className="card-image userEventCardImg"
                          style={{ backgroundImage: `url(${event.gig.image})` }}
                        />
                        <p>{event.eventName}</p>
                        <p>{event.gig.date}</p>
                      </div>
                    </Link>
                  </div>
                )}

              </div>
            {/* <div className="column is-one-third">

            </div> */}
            </div>
          </div>
        </div>
      </div>



    );
}





}

export default UsersShow;
