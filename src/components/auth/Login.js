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
      .then(() => this.props.history.push(`/users/${this.props.match.id}`))
      .catch(() => {
        Flash.setMessage('danger', 'Invalid credentials');
        this.props.history.replace('/login');
      });

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <input
            className="input"
            name="email"
            placeholder="Email"
            onChange={this.handleChange}

          />
        </div>
        <div className="field">
          <input
            type="password"
            className="input"
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
        </div>
        <button className="button">Submit</button>
      </form>
    );
  }
}

export default AuthLogin;
