import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../lib/Auth';
// import axios from 'axios';

class Navbar extends React.Component {

  state = {
    navIsOpen: false,
    user: {}
  }

  handleToggle = () => {
    this.setState({ navIsOpen: !this.state.navIsOpen });
  }

  //this is now redundant after deciding making the axios request was just complicating things!
  // componentDidMount() {
  //   Auth.isAuthenticated() && axios.get(`/api/users/${Auth.getPayload().sub}`)
  //     .then(res => this.setState({ user: res.data }, () => console.log('navbar', this.state)));
  // }

  componentWillUpdate() {
    this.state.navIsOpen && this.setState({ navIsOpen: false });
  }

  handleLogout = () => {
    Auth.logout();
    this.props.history.push('/');
    this.setState({ user: {} });
  }

  render() {
    return (
      <nav className="navbar is-transparent" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <span className="icon has-text-white">
              <i className="fas fa-home"></i>
            </span>
          </Link>
          <a role="button" className={`navbar-burger is-transparent ${this.state.navIsOpen? 'is-active' : ''}`} onClick={this.handleToggle}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className={`navbar-menu ${this.state.navIsOpen ? 'is-active' : ''}`}>
          <div className="navbar-end is-transparent">
            <Link to="/events" className="navbar-item">See Other Stand Up Soirées</Link>
            <Link to="/events/new" className="navbar-item">Plan a Stand Up Soirée</Link>
            {Auth.isAuthenticated() && <a onClick={this.handleLogout} className="navbar-item">Logout</a>}
            {Auth.isAuthenticated() && <Link  to={`/profile/${Auth.getPayload().sub}`} className="navbar-item">My Profile</Link>}
            {!Auth.isAuthenticated() && <Link to="/register" className="navbar-item">Register</Link>}
            {!Auth.isAuthenticated() && <Link to="/login" className="navbar-item">Login</Link>}
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
