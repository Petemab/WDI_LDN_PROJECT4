import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import './scss/style.scss';
import 'bulma';
import '@fortawesome/fontawesome-free-solid';

import Home from './components/Home';
import Navbar from './components/Navbar';


import EventsIndex from './components/events/Index';
import EventsShow from './components/events/Show';
import EventsNew from './components/events/New';
import UsersShow from './components/users/Show';
import EventsEdit from './components/events/Edit';
import AuthRegister from './components/auth/Register';
import AuthLogin from './components/auth/Login';
import SecureRoute from './components/common/SecureRoute';
import FlashMessages from './components/common/FlashMessages';


class App extends React.Component {
  render() {
    return (
      <Router>
        <main>
          <Navbar />
          <FlashMessages />
          <section className="section">
            <div className="container">
              <Switch>
                <SecureRoute exact path="/events/:id/edit" component={EventsEdit} />
                <SecureRoute exact path="/events/new" component={EventsNew} />
                <SecureRoute exact path="/events/:id" component={EventsShow}/>
                <Route exact path="/users/:id" component={UsersShow}/>
                <Route path="/events" component={EventsIndex}/>
                <Route path="/register" component={AuthRegister}/>
                <Route path="/login" component={AuthLogin}/>



                <Route exact path="/" component={Home} />
              </Switch>
            </div>
          </section>
        </main>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
