import React from 'react';
import { Animated } from 'react-native';
import Animation from 'lottie-react-native';

export default class BasicExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }

  loadAnimation() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      loop: true,
      duration: 3000,
    }).start(() => {
      // this.setState({progress: new Animated.Value(0)})
      // this.loadAnimation();
    });
  }

  componentDidMount() {
    this.loadAnimation();
  }

  render() {
    return (
      <Animation
        style={{
          width: 400,
          height: 400,
        }}
        loop={true}
        source={require('../assets/animation/pencil_write.json')}
        progress={this.state.progress}
      />
    );
  }
}