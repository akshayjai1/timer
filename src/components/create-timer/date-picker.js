import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
});

function DateAndTimePickers(props) {
  const { classes } = props;

  return (
    <TextField
      id="datetime-local"
      label="Schedule Timer"
      type="datetime-local"
      defaultValue={props.value}
      className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={props.onChange}
      error={props.validity.indexOf('d-')>-1}
    />
  );
}

DateAndTimePickers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DateAndTimePickers);
