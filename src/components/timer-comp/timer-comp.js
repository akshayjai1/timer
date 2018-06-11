import React, { Component } from 'react';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import IconButton from '@material-ui/core/IconButton';
import './timer-comp.css'
export default class TimerComponent extends Component {
  constructor(props) {
    super(props);
    this.timerClicked = this.timerClicked.bind(this);
    
  }

  state = {
    seconds: this.props.seconds,
    started: false,
    clearIntervalConstant:null,
    s:this.props.seconds?this.props.seconds*1000:50000,
    timer: ''
  };
  timerClicked() {
    console.log('inside function this.timerClicked');
    this.setState((prevState) => ({
      started: !prevState.started,
    }));
    console.log(this.state.started);
    this.timerPlayPause.call(this);
  }
  timerFunction() {
    console.log('value of this.state.s inside timer function ',this.state);
    if (this.state.s < 0) { clearInterval(this.state.clearIntervalConstant) }
    else {
      this.setState((prevState)=>({
        timer: new Date(this.state.s).toUTCString().substring(17, 25),
        s: prevState.s - 1000
       })); 
    }
    console.log(this.state.timer);
  }
  timerPlayPause(){
    console.log('value of this inside start function ',this);
    if(this.state.started){
      clearInterval(this.state.clearIntervalConstant);
      console.log("clearing intervale with ths.clearIntervalConstant = ",this.state.clearIntervalConstant)
    } else {
      this.setState((prevState)=>({
        clearIntervalConstant: setInterval(this.timerFunction.bind(this),1000)
      }))
      console.log("setting intervale with ths.clearIntervalConstant = ",this.state.clearIntervalConstant)
    }
  }

  render() {

    return (
        <div className="timer-comp-cover">
          <IconButton aria-label="Play/pause" onClick={this.timerClicked}>
            {this.state.started ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>{this.state.timer}
        </div>
    );
  }
}