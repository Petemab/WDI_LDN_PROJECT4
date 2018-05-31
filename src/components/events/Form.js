import React from 'react';




const EventForm = ({handleChange, findGigs, event}) => {

  return(
    <div className="columns is-mobile is-multiline is-centered">

      <div className="column is-one-third">
      </div>

      <div className="column is-one-third has-text-centered homeBox">
        <h1 className="subtitle has-text-black">Plan your Stand Up Soirée!</h1>
      </div>

      <div className="column is-one-third">
      </div>

      <div className="column is-one-third">
      </div>

      <div className="column is-one-third">
        <div className="field">
          <label htmlFor="name">Give your soirée the name it deserves</label>
          <input id="eventName" name="eventName" className="input is-rounded"
            placeholder="Event Name" onChange={handleChange}
            value={event.eventName || ''} />
        </div>
        <div className="field">
          <label htmlFor="date">What night do you want to go out?</label>
          <input id="date" type="date" name="date" className="input is-rounded"
            placeholder="Event Date" onChange={handleChange}
            value={event.date || ''} />
        </div>
        <button className="button is-small is-rounded is-black formButton"onClick={findGigs}>Find Gigs</button>
      </div>
      <div className="column is-one-third">
      </div>

    </div>



  );
};

export default EventForm;
