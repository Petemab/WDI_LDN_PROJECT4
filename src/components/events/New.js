import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import EventForm from './Form';
import Map from '../common/Map';



class EventsNew extends React.Component{

state = {
  errors: {}
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
    .then(res => this.setState({ gigs: res.data.results }, () =>
      console.log(this.state)));
}

selectGig = (gig) => {
  this.setState({ selectedGig: gig }, () =>
    console.log(this.state));
  // const gigLocation = {this.state.selectedGig.venue.latitude, this.state.selectedGig.venue.longitude};
}

selectPub = (pub) => {
  this.setState({ selectedPub: pub }, () =>
    console.log(this.state));
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
  console.log('this.state.gigs', this.state.gigs);
  return(
    <div>
      {!this.state.gigs && !this.state.selectedGig &&
        <div>
          <h1>This will be the create new event page</h1>
          <EventForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            event={this.state}
            findGigs={this.findGigs}
          />
        </div> }
      {!this.state.selectedGig && this.state.gigs && this.state.gigs.map(gig =>

        <div key={gig.id}>
          <h1>We found some gigs!</h1>
          <p>{gig.eventname}</p>
          {gig.artists.map(artist =>
            <div key={artist.id}>
              <p>{artist.name}</p>
            </div>
          )}
          <img src={`${gig.largeimageurl}`} />
          <a onClick={() => this.selectGig(gig)}>Select this Gig</a>
        </div>
      )}

      {this.state.gigs && this.state.selectedGig &&
        <div>
          <h1>This is your selected gig</h1>
          <h2>{this.state.selectedGig.eventname}</h2>
          <img src={`${this.state.selectedGig.largeimageurl}`} />
          {/* {this.State.selectedGig.artists.map(artist =>
            <div key={artist.id}>
              <p>{artist.name}</p>
              <img src={`${artist.image}`} />
            </div>
          )} */}
          <p>{this.state.selectedGig.description}</p>
          <p>{this.state.selectedGig.entryprice}</p>
          <p>{this.state.selectedGig.venue.name}</p>
          <p>{this.state.selectedGig.venue.address}</p>
          {/* this needs to change too */}
          <h1>Why not choose a bar or restaurant?</h1>
          <select value={this.state.value} onChange={this.handleChange}>
            <option name="pub" value="greenLion">The Green Lion</option>
            <option name="pub" value="redMonkey">The Red Monkey</option>
            <option name="pub" value="anotherBar">Another Bar</option>
            <option name="pub" value="drinkPlace">Drink Place</option>
          </select>
          {/* change the center below */}
          <Map className="map" center={{ lat: 51.5151, lng: -0.0718 }}/>

        </div>


      }
    </div>

  );


}


}

export default EventsNew;
