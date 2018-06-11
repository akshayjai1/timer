import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Calendar from '../components/calendar/calendar';
import Timer from '../components/create-timer/timer';
import TimerCard from '../components/timer-card/timer-card';
import TimerComponent from '../components/timer-comp/timer-comp';
import { NavbarFeatures } from './nav';
import './App.css';
const BasicExample = () => (
  <Router>
    <div>
      <ul className="navBar">
        <li>
          <Link to="/timer">Timer</Link>
        </li>
        <li>
          <Link to="/big-calendar">Big Calendar</Link>
        </li>
      </ul>
      <Route exact path="/" component={Timer} />
      <Route path="/timer" component={Timer} />
      <Route path="/big-calendar" component={Calendar} />
    </div>
  </Router>
);



const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

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


export default BasicExample;
