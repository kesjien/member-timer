import React from 'react';
import { Animated, Text, View } from 'react-native';
import Pencil from './pencil';
import BackgroundTimer from 'react-native-background-timer';


export default class Main extends React.Component {
  constructor() {
    super();
    this.startTimer = this.startTimer.bind(this);
    this.state = {
        timerMinutes: '00',
        timerSeconds: '00'
    };
  }



  startTimer() {
    let diff, minutes, seconds, start = Date.now();
    const intervalId = BackgroundTimer.setInterval(() => {
      
      diff = 300 - (((Date.now() - start) / 1000) | 0);

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
      }

    }, 1000);
  }

  render() {
    return (
      <View style={{justifyContent: 'center'}}>
        <Text onPress={this.startTimer} style={{ fontFamily: 'digital-7', textAlign:'center', fontSize: 80 }}>{this.state.timerMinutes}:{this.state.timerSeconds}</Text>
        <Pencil/>
      </View>
    );
  }
}