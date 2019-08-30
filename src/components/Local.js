
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

export default class Local extends Component {
  render () {
    return (
      <TouchableOpacity style={styles.local} onPress={this.props.onPress}>
        <Text style={styles.name}>{this.props.local.name}</Text>
        <Text style={styles.summary}>{
          this.props.local.devices
            .map((device, i) => <Text key={i}>{device.name}</Text>)
            .reduce((acc, item) => acc === null ? [item] : [acc, ', ', item], null)
        }</Text>
        <Text style={styles.total}>{this.props.local.devices.length} dispositivos</Text>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  local: {
    minWidth: 150,
    padding: 10,
    paddingVertical: 20,
    borderRadius: 12,
    margin: 10,
    flex: 2,
    backgroundColor: '#fff'
  },
  name: {
    fontWeight: 'bold'
  },
  summary: {
    minHeight: 45,
    paddingVertical: 5,
    fontSize: 10,
    color: '#999'
  },
  total: {
    paddingTop: 10,
    fontSize: 11,
    color: '#0e328e',
    fontWeight: 'bold'
  },
});

