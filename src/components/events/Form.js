import React from 'react';


//add list of functions to pass in the event form

const EventForm = ({handleChange, findGigs, event}) => {

  return(
    <form >
      <h1>This will be a form</h1>
      <div className="field">
        <label htmlFor="name">Event Name</label>
        <input id="name" name="name" className="input"
          placeholder="Event Name" onChange={handleChange}
          value={event.name} />
      </div>
      <div className="field">
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" className="input"
          placeholder="Event Date" onChange={handleChange}
          value={event.date} />
      </div>
      <button onClick={findGigs}>Find Gigs</button>
      {/* <div className="field">
        <label htmlFor="location">Which City?</label>
        <input id="city" name="city" className="input"
          placeholder="Which City?" onChange={handleChange}
          value={event.city} />
      </div> */}

    </form>


  );
};

export default EventForm;
