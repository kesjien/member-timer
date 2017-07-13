import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableHighlight } from 'react-native';
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
      <TouchableHighlight underlayColor={"#ccc"} onPress={() => this.props.extendTime(this.props.time)}>
        <Text style={styles.timerSmall}>+{this.state.minutes}:{this.state.seconds}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = {
  timerSmall: {
    fontFamily: 'digital-7',
    textAlign:'center',
    fontSize: 20,
  },
}

BasicExample.propTypes = {
  time: PropTypes.number,
  extendTime: PropTypes.func
};