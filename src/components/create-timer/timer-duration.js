import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import './timer-duration.css';
import moment from 'moment';

const showSecond = true;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';
const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 6,
    paddingBottom: 6,
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 2,
    backgroundColor: '#0bf9e3',
  }),
});

function PaperSheet(props) {
  const { classes } = props;
  return (
    <div>
      <Paper className={classes.root + ' duration-paper'} elevation={0}>
        <span style={{color:props.validity.indexOf('v-')>-1?'rgb(200,0,0)':'rgba(0, 0, 0, 0.54)',fontSize:'0.8rem',fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif'}}>Enter Duration > 0:</span>&nbsp;&nbsp;
        <TimePicker
          style={{ width: 100, borderRadius: 0 }}
          showSecond={showSecond}
          defaultValue={moment(-19200000)}
          className="react-duration"
          onChange={props.onChange}
          allowEmpty={false}
        />
      </Paper>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
