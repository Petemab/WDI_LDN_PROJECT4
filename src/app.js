import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import './scss/style.scss';

import Home from './components/Home';


import EventsIndex from './components/events/Index';
import EventsShow from './components/events/Show';
import EventsNew from './components/events/New';
import UsersShow from './components/users/Show';
import AuthRegister from './components/auth/Register';
import AuthLogin from './components/auth/Login';
import FlashMessages from './components/common/FlashMessages';


class App extends React.Component {
  render() {
    return (
      <Router>
        <main>
          <FlashMessages />
          <section className="section">
            <div className="container">
              <Switch>
                <Route exact path="/events/new" component={EventsNew} />
                <Route exact path="/events/:id" component={EventsShow}/>
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
