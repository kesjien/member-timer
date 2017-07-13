import React from 'react';
import { Text, View, Vibration } from 'react-native';
import Pencil from './pencil';
import TimeExtender from './timeExtender';
import BackgroundTimer from 'react-native-background-timer';
import PropTypes from 'prop-types';

export default class Main extends React.Component {
  constructor(props) {
    super();
    this.intervalId = 0;
    this.diff = 0;
    this.startTimer = this.startTimer.bind(this);
    this.extendTime = this.extendTime.bind(this);
    const seconds = (props.time % 60) | 0;
    const minutes = (props.time / 60) | 0;
    this.state = {
      diff: props.time,
      timerMinutes: (minutes < 10) ? `0${minutes}` : minutes | '00',
      timerSeconds: (seconds < 10) ? `0${seconds}` : seconds | '00',
      startAnimation: false,
    };
  }

  startTimer() {
    if (this.state.startAnimation && this.intervalId){
      this.setState({diff: this.diff})
      BackgroundTimer.clearInterval(this.intervalId);
      this.setState({
        startAnimation: false
      })
      return;
    }
    let minutes, seconds, start = Date.now();
    this.intervalId = BackgroundTimer.setInterval(() => {
      this.diff = this.state.diff - (((new Date() - start) / 1000) | 0);
      minutes = (this.diff / 60) | 0;
      seconds = (this.diff % 60) | 0;

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      this.setState({
        timerMinutes: minutes,
        timerSeconds: seconds
      })

      if (this.diff <= 0) {
        this.startInterval = Date.now() + 1000;
        BackgroundTimer.clearInterval(this.intervalId);
        this.setState({
          startAnimation: false
        })
        Vibration.vibrate([500, 500, 500, 500, 500, 500]);
      }
    }, 1000);

    this.setState({
      startAnimation: true
    })
  }

  extendTime(time) {
    const diff = this.state.diff + time;
    const seconds = (diff % 60) | 0;
    const minutes = (diff / 60) | 0;
    this.setState({
      diff: diff,
      timerMinutes: (minutes < 10) ? `0${minutes}` : minutes | '00',
      timerSeconds: (seconds < 10) ? `0${seconds}` : seconds | '00',
    })
  }

  render() {
    return (
      <View style={{justifyContent: 'center'}}>
        <Text onPress={this.startTimer} style={styles.timer}>{this.state.timerMinutes}:{this.state.timerSeconds}</Text>
        <View style={styles.timerConfigurations}>
          <View style={styles.configurationsBox}>
            <TimeExtender extendTime={this.extendTime} time={300}/>
            <TimeExtender extendTime={this.extendTime} time={600}/>
            <Text onPress={this.startTimer} style={styles.timerSmall}>{this.state.timerMinutes}:{this.state.timerSeconds}</Text>
          </View>
        </View>
        <Pencil startAnimation={this.state.startAnimation} />
      </View>
    );
  }
}

const styles = {
  timer: {
    fontFamily: 'digital-7',
    textAlign:'center',
    fontSize: 80
  },
  timerConfigurations: {
    borderColor: "#000",
    borderTopWidth: 1,
    marginLeft: 40,
    marginRight: 40
  },
  configurationsBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20
  }
}
Main.propTypes = {
  time: PropTypes.number
};