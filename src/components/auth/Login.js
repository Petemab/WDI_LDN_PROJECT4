import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

class AuthLogin extends React.Component {
  state = {};

  handleChange = ({ target: {name, value }}) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios.post('api/login', this.state)
      .then(res => {
        Auth.setToken(res.data.token);
        Flash.setMessage('info', res.data.message);

      })
      //change the page user pushes to to their user page here
      .then(() => this.props.history.push('/events'))
      .catch(() => {
        Flash.setMessage('danger', 'Invalid credentials');
        this.props.history.replace('/login');
      });

  }

  render() {
    return (
      <div className="columns is-mobile is-multiline is-centered">
        <div className="column is-one-third">
        </div>
        <div className="column is-one-third has-text-centered homeBox">
          <h1 className="subtitle has-text-black">Log In</h1>
        </div>
        <div className="column is-one-third">
        </div>
        <div className="column is-one-third">
        </div>
        <div className="column is-one-third">
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <input
                className="input is-rounded"
                name="email"
                placeholder="Email"
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <input
                type="password"
                className="input is-rounded"
                name="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </div>
            <button className="button is-black is-rounded logButton">Submit</button>
          </form>
        </div>
        <div className="column is-one-third">
        </div>
      </div>
    );
  }
}

export default AuthLogin;
