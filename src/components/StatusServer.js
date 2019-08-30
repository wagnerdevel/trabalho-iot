import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');

export default class StatusServer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.isConnected ? 'Online' : 'Offline'} </Text>
        {this.props.isConnected ? <View style={styles.iconOn}></View> : <View style={styles.iconOff}></View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 30,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 2000,
    top: 70,
    right: 20,
  },
  text: { 
    color: '#ccc' 
  },
  iconOn: {
    width: 15,
    height: 15,
    borderRadius: 15,
    backgroundColor: '#23b22a',
  },
  iconOff: {
    width: 15,
    height: 15,
    borderRadius: 15,
    backgroundColor: '#b52424',
  }
});
