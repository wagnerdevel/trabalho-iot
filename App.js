
import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import Local from './src/components/Local';

export default class App extends Component {
  render () {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Image
          style={styles.avatar}
          source={require('./src/assets/images/avatar.jpg')}
        />
        <Text style={styles.welcome}>Olá Wagner</Text>
        <Text style={styles.welcome2}>Bem-vindo à sua casa</Text>
        <ScrollView style={{marginHorizontal: -10, paddingHorizontal: 10}}>
          <View style={styles.locations}>
            <Local name="Quarto 1" devices={['2 lâmpadas', '1 televisão', '1 ar condicionado']}></Local>
            <Local name="Quarto 2" devices={['2 lâmpadas', '1 ar condicionado']}></Local>
            <Local name="Sala 1" devices={['4 lâmpadas', '1 televisão', '1 ar condicionado']}></Local>
            <Local name="Cozinha 1" devices={['1 microondas', '3 lâmpadas', '1 cafeteria']}></Local>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.btnAddLocal}>
            <Text style={{justifyContent: 'center', fontSize: 38, color: '#0e328e', textAlign: 'center'}}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 50,
    backgroundColor: '#2b4ca0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 10
  },
  welcome: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10
  },
  welcome2: {
    color: '#e9e9e9',
    margin: 10,
    marginTop: 0
  },
  locations: {
    marginVertical: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#0e328e'
  },
  btnAddLocal: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: '#fff',
    alignContent: 'center',
    textAlign: 'center',
    marginTop: -28,
    borderWidth: 4,
    borderColor: '#0e328e'
  },
});

