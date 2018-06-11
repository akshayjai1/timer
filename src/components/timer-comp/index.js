import React from 'react';
import ReactDOM from 'react-dom';
import Countdown from './timer1';

// Random component
const Completionist = () => <span>You are good to go!</span>;

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    return <Completionist />;
  } else {
    // Render a countdown
    return <span>{hours}:{minutes}:{seconds}</span>;
  }
};

ReactDOM.render(
  <Countdown
    date={Date.now() + 50000}
    renderer={renderer}
  />,
  document.getElementById('root')
);