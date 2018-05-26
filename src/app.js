import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Home from './components/Home';


import EventsIndex from './components/events/Index';
import EventsShow from './components/events/Show';
import EventsNew from './components/events/New';

class App extends React.Component {
  render() {
    return (
      <Router>
        <main>
          <section className="section">
            <div className="container">
              <Switch>
                <Route exact path="/events/new" component={EventsNew} />
                <Route exact path="/events/:id" component={EventsShow}/>
                <Route path="/events" component={EventsIndex}/>



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
