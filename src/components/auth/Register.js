import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';


class AuthRegister extends React.Component{
  state = {};

  handleChange = ({ target: {name, value }}) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/register', this.state)
      .then(res => {
        Auth.setToken(res.data.token);
        Flash.setMessage('info', res.data.message);
      })
      .then(() => this.props.history.push('/login'))
      .catch(() => {
        Flash.setMessage('danger', 'Invalid credentials');
        this.props.history.replace('/register');
      });

  }

  render(){
    return(
      <div className="columns is-mobile is-multiline is-centered">
        <div className="column is-one-third">
        </div>
        <div className="column is-one-third has-text-centered homeBox">
          <h1 className="subtitle has-text-black">Sign up</h1>
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
                name="username"
                placeholder="User Name"
                onChange={this.handleChange}
              />
            </div>
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
            <div className="field">
              <input
                type="password"
                className="input is-rounded"
                name="passwordConfirmation"
                placeholder="Password Confirmation"
                onChange={this.handleChange}
              />
            </div>
            <button className="button is-black is-rounded regButton">Submit</button>
          </form>
        </div>
        <div className="column is-one-third">
        </div>
      </div>


    );
  }


}

export default AuthRegister;
