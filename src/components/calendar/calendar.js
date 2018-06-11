import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment);

// Calendar.setLocalizer(Calendar.momentLocalizer(moment));

class Calendar extends Component {
  state = {
    events: [
      {
        start: new Date(),
        end: new Date(moment().add(1, 'hours')),
        title: 'FirstProject',
      },
    ],
  };

  render() {
    return (
      <BigCalendar
        defaultDate={new Date()}
        defaultView="month"
        events={this.state.events}
        style={{ height: '100vh' }}
      />
    );
  }
}

export default Calendar;
