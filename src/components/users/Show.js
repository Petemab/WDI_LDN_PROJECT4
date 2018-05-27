import React from 'react';
import axios from 'axios';



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
      <div>
        <h1>This will be the user show page</h1>
        <p>{ user.username }</p>
        <img src={`${user.image}`}/>
        <p>{user.faveComedians[0]}</p>

      </div>


    );


  }



}

export default UsersShow;
