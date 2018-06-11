import React from 'react';
  import PropTypes from 'prop-types';
  import { withStyles } from '@material-ui/core/styles';
  import MenuItem from '@material-ui/core/MenuItem';
  import TextField from '@material-ui/core/TextField';

  import DatePicker from './date-picker';
  import 'rc-time-picker/assets/index.css';
  import moment from 'moment';
  import TimerDuration from './timer-duration';
  import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 220,
  },
  menu: {
    width: 220,
  },
});

const projects = [
  {
    value: 'Project One',
    label: 'Project One',
  },
  {
    value: 'Project Two',
    label: 'Project Two',
  },
  {
    value: 'Project Three',
    label: 'Project Three',
  },
  {
    value: 'Project Four',
    label: 'Project Four',
  },
];

const showSecond = true;
const nameRegex = /([a-zA-Z]{3,19}s*)+/;
const noteRegex = /([a-zA-Z]{3,100}s*)+/;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';

class TextFields extends React.Component {
  state = {
    name: 'Timer One',
    project: 'Project One',
    seconds: 600,
    timerDate: new Date().toISOString().substring(0, 16),
    note: 'default',
    validationString:'n+v+d+p+t+',
    formIsValid: true,
    id:null
  };
  /* nvdpt stands for name, value, date, project and notes in order */
  
  handleChange = name => event => {
    let tempValidationString;
    var value = event.target.value;
    if(name === 'name'){
      if(nameRegex.test(value)){
        tempValidationString = this.state.validationString.replace('n-','n+');  
      } else {
        tempValidationString = this.state.validationString.replace('n+','n-')
      }
    }
    if(name === 'timerDate'){
      if(value.length > 0){
        tempValidationString = this.state.validationString.replace('d-','d+');  
      } else {
        tempValidationString = this.state.validationString.replace('d+','d-')
      }
    }
    //validation for timer duration is done in function updateDuration
    if(name === 'note'){
      if(noteRegex.test(value)){
        tempValidationString = this.state.validationString.replace('t-','t+');  
      } else {
        tempValidationString = this.state.validationString.replace('t+','t-')
      }
    } 

    this.setState((prevState)=>({
      [name]: value,
      validationString: tempValidationString,
      formIsValid: tempValidationString==='n+v+d+p+t+'
    }));
  };

  updateDuration = function(momentInstance) {
    console.log('inside function updateDuration');
    var tempValidationString, totalSeconds=0;
    // if(momentInstance){
      totalSeconds = momentInstance.hours()*60*60 + momentInstance.minutes()*60 + momentInstance.seconds();
      if(totalSeconds > 0){
        tempValidationString = this.state.validationString.replace('v-','v+');
      } else {
        tempValidationString = this.state.validationString.replace('v+','v-');  
      }
    // } else {
    //   tempValidationString = this.state.validationString.replace('v+','v-');
    // }
    this.setState((prevState)=>({
          seconds: totalSeconds,
          validationString: tempValidationString,
          formIsValid: tempValidationString==='n+v+d+p+t+'
        }));
    }

  saveTimer = function() {
    console.log(this.state);
    let timers = JSON.parse(localStorage.getItem("timers"))||[];
    timers.push({...this.state,id:Date.now()});
    localStorage.setItem("timers", JSON.stringify(timers));
  };

  render() {
    console.log('this is timers from previous timer',localStorage.getItem('timers'));
    if(!localStorage.getItem('timers')){
      // localStorage.setItem('timers','[]')
    }
    this.handleChange = this.handleChange.bind(this);
    this.updateDuration = this.updateDuration.bind(this);
    this.saveTimer = this.saveTimer.bind(this);
    const { classes } = this.props;

    return (
      <form className={classes.container} autoComplete="off">
        <TextField
          error={this.state.validationString.indexOf('n-')>-1}
          name="timerName"
          required={true}
          id="name"
          label="Timer Name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
          helperText="Atleast 3 characters"
        />

        <TimerDuration onChange={this.updateDuration} validity={this.state.validationString}/>
        <DatePicker required={true} onChange={this.handleChange('timerDate')} validity={this.state.validationString} 
          value={this.state.timerDate}/>

        <TextField
          error={this.state.validationString.indexOf('p-')>-1}
          id="select-project"
          required={true}
          select
          label="Select Project"
          className={classes.textField}
          value={this.state.project}
          onChange={this.handleChange('project')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
        >
          {projects.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          error={this.state.validationString.indexOf('t-')>-1}
          required={true}
          id="textarea"
          label="Notes"
          placeholder="Note on Timer"
          multiline
          className={classes.textField}
          onChange={this.handleChange('note')}
          margin="normal"
          style={{ marginTop: 4 }}
          helperText="Atleast 3 characters"  
          defaultValue={this.state.note}        
        />
        <Button
          type="submit"
          disabled={!this.state.formIsValid}
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.saveTimer}
          style={{ backgroundColor: '#06a764', borderRadius: 0, marginTop: 8 }}
        >
          Create Timer
        </Button>
      </form>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
