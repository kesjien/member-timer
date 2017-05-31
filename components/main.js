import React from 'react';
import { Animated } from 'react-native';
import Pencil from './pencil';


export default class BasicExample extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Pencil/>
    );
  }
}