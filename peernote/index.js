import React from 'react';
import { AppRegistry } from 'react-native';
import Shell from './src/shell';

console.disableYellowBox = true;

const App = () => {
  return <Shell />;
};

AppRegistry.registerComponent('peernote', () => App);
