import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
export default class BasicExample extends React.Component {
  constructor(props) {
    super();
    const seconds = (props.time % 60) | 0;
    const minutes = (props.time / 60) | 0;
    this.state = {
      minutes: (minutes < 10) ? `0${minutes}` : minutes | '00',
      seconds: (seconds < 10) ? `0${seconds}` : seconds | '00',
    }
  }
  render() {
    return (
      <Text style={styles.timerSmall}>+{this.state.minutes}:{this.state.seconds}</Text>
    );
  }
}

const styles = {
  timerSmall: {
    fontFamily: 'digital-7',
    textAlign:'center',
    fontSize: 20,
    paddingTop: 20
  },
}

BasicExample.propTypes = {
  time: PropTypes.number
};