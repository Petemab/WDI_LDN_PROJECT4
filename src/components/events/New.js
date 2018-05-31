import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import EventForm from './Form';
import Map from '../common/Map';
import qs from 'querystring';



class EventsNew extends React.Component{

state = {
  errors: {}
}

//desctructures the e event to pass it as an argument
handleChange = ({ target: { name, value } }) => {
  const errors = {...this.state.errors, [name]: '' };
  this.setState({ errors, [name]: value }, () => console.log(this.state));

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
        radius: 10,
        eventcode: 'COMEDY',
        description: 1,
        minDate: `${this.state.date}`
      }
    })
    .then(res => this.setState({ gigs: res.data.results }, () =>
      console.log(this.state)));
}

selectGig = (selectedGig) => {

  const gig = {
    name: selectedGig.eventname,
    image: selectedGig.largeimageurl,
    venue: selectedGig.venue.name,
    address: selectedGig.venue.address,
    location: {
      lat: selectedGig.venue.latitude,
      lng: selectedGig.venue.longitude
    },
    date: selectedGig.date,
    startTime: selectedGig.openingtimes.doorsopen,
    entryPrice: selectedGig.entryprice,
    ticketsAvailable: selectedGig.tickets,
    acts: selectedGig.artists,
    description: selectedGig.description,
    comments: []
  };

  const event = { ...this.state.event, gig };
  this.setState({ event }, this.findPubs);
  // const gigLocation = {this.state.selectedGig.venue.latitude, this.state.selectedGig.venue.longitude};
}

findPubs = () => {
  const { gig } = this.state.event;
  axios
    .get('https://maps.googleapis.com/maps/api/place/nearbysearch/json',{
      params: {
        location: `${gig.location.lat},${gig.location.lng}`,
        radius: 500,
        type: 'bar',
        key: 'AIzaSyCPr7S7RyMxHqqWsRNkhhDL5-tOIZ2c2QU'
      }
    }
    )
    .then(res => this.setState({ pubs: res.data.results }, () =>
      console.log(this.state)));

}

// to get the image from google places
getImageUrl = (place) => {
  if(!place.photos[0]) return null;
  const endpoint = 'https://maps.googleapis.com/maps/api/place/photo';
  const params = {
    key: 'AIzaSyCPr7S7RyMxHqqWsRNkhhDL5-tOIZ2c2QU',
    photoreference: place.photos[0].photo_reference,
    maxwidth: 400
  };
  return `${endpoint}?${qs.stringify(params)}`;
}

//gets the pub from the Google places search and saves to state
selectPub = (e) => {
  const { value: placeId } = e.target;
  const selectedPub = this.state.pubs.find(pub => pub.place_id === placeId);

  const pub = {
    name: selectedPub.name,
    address: selectedPub.vicinity,
    location: selectedPub.geometry.location,
    image: this.getImageUrl(selectedPub)
  };

  const eventName = this.state.eventName;
  const event = { ...this.state.event, pub, eventName };
  this.setState({ event }, () =>
    console.log('after selecting pub ====>', event));
}

handleSubmit = (e) => {
  e.preventDefault();
  console.log('======>',this.state.event);

  axios.post('/api/events', this.state.event, {
    headers: { Authorization: `Bearer ${Auth.getToken()}` }
  })
    .then(() => this.props.history.push('/events'))
    .catch(err => this.setState({ errors: err.response.data.errors }));
}

render(){
  const { gig, pub } = this.state.event || {};
  return(
    <div>
      {!this.state.gigs && !this.state.selectedGig &&
        <div>
          <EventForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            event={this.state}
            findGigs={this.findGigs}
          />
        </div> }


      {!gig && this.state.gigs &&
        <h1 className="userShowtitle">We Found Some Great Gigs!</h1>
      }

      {!gig && this.state.gigs && <div className="columns is-multiline">
        {this.state.gigs.map(gig =>
          <div className="column is-one-third-desktop is-half-tablet" key={gig.id}>
            <div className="card userShowCard">
              <div
                className="card-image"
                style={{ backgroundImage: `url(${gig.largeimageurl})` }}
              ></div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">{gig.eventname}</p>
                    {gig.artists.map(artist =>
                      <div key={artist.artistid}>
                        <p className="subtitle is-6">{artist.name}</p>
                      </div>
                    )}
                    <p className="subtitle is-6">{gig.date}</p>
                    <p className="subtitle is-6">{gig.entryprice}</p>
                    <p className="subtitle is-6">{gig.description}</p>
                    <p className="subtitle is-6">{gig.venue.name}</p>
                    <p className="subtitle is-6">{gig.venue.address}</p>
                    <p className="subtitle is-6">{gig.venue.postcode}</p>
                    <a className="subtitle is-8" href={`${gig.link}`}>Find Out More</a>
                    <hr/>
                    <button className="button is-small is-black is-rounded" onClick={() => this.selectGig(gig)}>Select this Gig</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      }

      {this.state.gigs && gig &&
        <div className="columns is-multiline">
          <div className="column is-half">
            <h1 className="userShowtitle">This is your selected gig</h1>

            <div className="card userShowCard">
              <div
                className="card-image"
                style={{ backgroundImage: `url(${gig.image})` }}
              >
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">{ gig.name }</p>
                    <p className="subtitle is-5">{gig.venue}</p>
                    <p className="subtitle is-5">{gig.address}</p>
                    <p className="subtitle is-5">{gig.date}</p>
                    <p className="subtitle is-5">{gig.startTime}.00</p>
                    <p className="subtitle is-5">{gig.entryprice}</p>
                    <p className="subtitle is-6">{gig.description}</p>
                    <p className="subtitle is-6">{gig.acts[0]}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <h1 className="userShowtitle">Why not go for a drink before?</h1>
            <div className="card pubShowCard">
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    {this.state.pubs &&
                    <select name="pub" onChange={this.selectPub} defaultValue="">
                      <option value="" disabled>Please select</option>
                      {this.state.pubs.map(pub => <option key={pub.place_id} value={pub.place_id}>{pub.name}</option>)}
                    </select>
                    }
                    <Map className="map" center={gig.location}/>
                    <hr/>
                    {/* Can't get mrkers to appear  === pubMarker={pub.location} */}

                    <button className="button is-small is-rounded is-black saveButton" onClick={this.handleSubmit}>Save this Stand Up Soirée</button>

                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>


      }
    </div>

  );


}


}

export default EventsNew;
