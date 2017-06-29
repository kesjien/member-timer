import React from 'react';
import { Text, View, Vibration } from 'react-native';
import Pencil from './pencil';
import BackgroundTimer from 'react-native-background-timer';
export default class Main extends React.Component {
  constructor() {
    super();
    this.startTimer = this.startTimer.bind(this);
    this.state = {
      timerMinutes: '00',
      timerSeconds: '00',
      startAnimation: false,
    };
  }

  startTimer() {
    this.setState({
      startAnimation: true
    })
    let diff, minutes, seconds, start = Date.now();
    const intervalId = BackgroundTimer.setInterval(() => {
      diff = 30 - (((Date.now() - start) / 1000) | 0);

      minutes = (diff / 60) | 0;
      seconds = (diff % 60) | 0;

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      this.setState({
        timerMinutes: minutes,
        timerSeconds: seconds
      })

      if (diff <= 0) {
        start = Date.now() + 1000;
        BackgroundTimer.clearInterval(intervalId);
        this.setState({
          startAnimation: false
        })
        Vibration.vibrate([500, 500, 500, 500, 500, 500]);
      }
    }, 1000);
  }

  render() {
    return (
      <View style={{justifyContent: 'center'}}>
        <Text onPress={this.startTimer} style={styles.timer}>{this.state.timerMinutes}:{this.state.timerSeconds}</Text>
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
  }
}