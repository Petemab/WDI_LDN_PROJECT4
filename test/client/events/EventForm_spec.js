/* global describe, it */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import EventsForm from '../../../src/components/events/Form';


describe('EventsForm', () => {
  it('should render 1 input field and 1 date field', done => {
    const state = {
      errors: {}
    };


    const component = shallow(<EventsForm event={state} errors={state.errors} />);
    expect(component.find('input').length).to.eq(1);
    // expect(component.find('date').length).to.eq(1);
  });

  it('should populate the form', done => {
    const state = {
      eventName: 'eventName',
      date: 'date',
      errors: {}
    };

    const component = shallow(<EventsForm event={state} errors={state.errors} />);
    expect(component.find({value: 'eventName', name: 'eventName'}).length).to.eq(1);
    expect(component.find({value: 'date', name: 'date'}).length).to.eq(1);
    done();
  });


});
