import React from 'react';
import { Link  } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className="columns is-multiline is-mobile">
        <div className="column is-three-fifths is-half-mobile is-offset-one-fifth has-text-centered">
          <h1 className="title has-text-white">Stand Up Soirée</h1>
          <h2 className="subtitle has-text-white">Plan your London comedy night out. Sign up now</h2>
        </div>
        <div className="column is-one-third is-half-mobile has-text-centered homeBox">
          <Link to="/register">
            <h1 className="subtitle has-text-black">Sign up</h1>
          </Link>
        </div>
        <div className="column is-half-mobile is-one-third">

        </div>
        <div className="column is-one-third is-half-mobile has-text-centered homeBox">
          <Link to="/login">
            <h1 className="subtitle has-text-black">Sign in</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
