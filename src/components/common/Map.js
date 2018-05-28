/* global google */

import React from 'react';
// import _ from 'lodash';


class Map extends React.Component {

  constructor() {
    super();
    this.markers = [];
  }

  componentDidMount() {
    this.map = new google.maps.Map(this.mapDiv, {
      center: this.props.center,
      zoom: 14
    });

    this.marker = new google.maps.Marker({
      position: this.map.getCenter(),
      map: this.map,
      label: '😆'
    });

    // this.generateMarkers();

  }
  // fix this
  // generateMarkers = () => {
  //   if(!this.props.markers) return false;
  //
  //   this.markers.forEach(marker => marker.setMap(null));
  //
  //   this.markers = this.props.markers.map(marker => {
  //     return new google.maps.Marker({
  //       position: marker.location,
  //       map: this.map,
  //       label: '🍺'
  //     });
  //   });
  //
  // }
  //
  // debouncedGenerateMarkers = _.debounce(() => this.generateMarkers(), 250);
  //
  // componentDidUpdate() {
  //   this.debouncedGenerateMarkers();
  // }

  //to make sure map is destroyed after leaving page
  componentWillUnmount() {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = null;
    this.marker.setMap(null);
    this.marker = null;
    this.map = null;
  }

  render() {
    const className = this.props.className ? this.props.className + ' map' : 'map';
    return (
      <div className={className} ref={el => this.mapDiv = el}/>
    );
  }

}

export default Map;
