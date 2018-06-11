import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import DeleteIcon from '@material-ui/icons/Delete';

import SkipNextIcon from '@material-ui/icons/SkipNext';
import TimerComponent from '../timer-comp/timer-comp';
import timer from './timer.png';
import './timer-card.css';

const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    height: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  createTimerAndCards:{
    position: 'relative',
    top: '12px',
    marginLeft: '30px'
  },
  mainTimer:{
    width: '280px',
    textAlign: 'left',
    margin: '30px',
    position: 'absolute',
    top: '-24px',
    right: '100px'
  }
});

class TimerCardsCover extends Component{
    constructor(props){
      super(props);
      this.updateTimersInState = this.updateTimersInState.bind(this);
      this.deleteTimerFromState = this.deleteTimerFromState.bind(this);
    } 
    state={
      timers: JSON.parse(localStorage.getItem('timers'))||[],
      anyTimerOn: false
    }
    updateTimersInState(){

    }
    deleteTimerFromState=(id)=>{
      this.id = id
      this.setState((prevState,props,id)=>{
        let newTimers = prevState.timers.filter(e=>e.id != this.id);
        localStorage.setItem('timers',JSON.stringify(newTimers));
        return {
          timers: newTimers
        }
      });
    }
    render(){
    let cards = this.state.timers.map((timer,index)=>(
      <Card className={this.props.classes.card + ' timer-card'}  key={timer.id} style={{}}>
        <div className={this.props.classes.details}>
          <CardContent className={this.props.classes.content}>
              <TimerHeader anyTimerOn={this.state.anyTimerOn} data={timer} timersUpdateFn={this.updateTimersInState} timerDeleteFn={this.deleteTimerFromState}/>
          </CardContent>
        </div>
      </Card>
    ));
    return (<div style={{display:'inline-block',width:'70%',maxWidth:'1000px',verticalAlign:'top'}}>
    <div className={this.props.classes.mainTimer}><TimerComponent /></div>
    <div className={this.props.classes.createTimerAndCards}>{cards}</div></div>
  );
}
}

class TimerHeader extends Component{
  timerString = (new Date(-19800000 + this.props.data.seconds*1000) + "").substring(16,24);
  deleteTimer = ()=>{
      console.log('in function delete timer');
      this.props.timerDeleteFn(this.props.data.id);
    }
  state={
    id:this.props.data.id
  }
  render(){
    // this.deleteTimer = this.deleteTimer.bind(this);
    return (<div>
          <h3 className="timer-name">{this.props.data.name}</h3><span style={{textAlign:'right'}}>{this.timerString}</span>
          <IconButton className="timerDeleteIcon" aria-label="Delete Timer" ><DeleteIcon onClick={this.deleteTimer}/></IconButton>
          <TimerComponent anyTimerOn={this.props.anyTimerOn} seconds={this.props.data.seconds}/>
          <h4 className="project-name">{this.props.data.project}</h4><span>{this.props.data.timerDate.substring(0,10)}</span>{" "+this.props.data.note}
          </div>
          )}
        }  
TimerCardsCover.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TimerCardsCover);
