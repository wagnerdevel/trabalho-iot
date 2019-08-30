
import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Modal
} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';
import MqttService from "../services/MqttService";
import StatusServer from '../components/StatusServer';
import Local from '../components/Local';
import locations from './locations';

const Icons = { 
  1 : require('../assets/images/1.png'),
  2 : require('../assets/images/2.png'),
  3 : require('../assets/images/3.png'),
  4 : require('../assets/images/4.png'),
  5 : require('../assets/images/5.png'),
}

function getDeviceIndexesById(id) {
  for (var i in locations) {
    for (j in locations[i].devices) {
      if (locations[i].devices[j].id === id) {
        return {local: i, device: j};
      }
    }
  }

  return null;
}

export default class HomeScreen extends Component {
  state = {
    isConnected: false,
    modalVisible: false,
    localIndex: null
  };

  componentDidMount() {
    MqttService.connectClient(
      this.mqttSuccessHandler,
      this.mqttConnectionLostHandler
    );
  };

  onReceive = message => {
    message = message.split(':');
    
    const indexes = getDeviceIndexesById(parseInt(message[0]));
    const status  = message[1] === 'true';

    locations[indexes.local].devices[indexes.device].status.on = status;

    this.setState({
      devices: this.state.devices
    });
  };

  mqttSuccessHandler = () => {
    MqttService.subscribe('pos-cc-iot/wagner', this.onReceive)

    this.setState({
      isConnected: true
    });
  };

  mqttConnectionLostHandler = () => {
    this.setState({
      isConnected: false
    });
  };

  openLocal(localIndex) {
    this.setState({ localIndex, modalVisible: true });
  }

  closeLocal() {
    this.setState({ localIndex: null, modalVisible: false });
  }

  changeStatus(deviceIndex, status) {
    MqttService.publishMessage('pos-cc-iot/wagner', locations[this.state.localIndex].devices[deviceIndex].id +':'+ status +':'+ locations[this.state.localIndex].name +':'+ locations[this.state.localIndex].devices[deviceIndex].name);
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusServer isConnected={this.state.isConnected} />
        <StatusBar barStyle="light-content" />
        <Image
          style={styles.avatar}
          source={require('../assets/images/avatar.jpg')}
        />
        <Text style={styles.welcome}>Olá Wagner</Text>
        <Text style={styles.welcome2}>Bem-vindo à sua casa</Text>
        <ScrollView style={{marginHorizontal: -10, paddingHorizontal: 10}}>
          <View style={styles.locations}>
            {locations.map((local, i) => 
              <Local key={i} onPress={() => { this.openLocal(i) }} local={local}></Local>
            )}
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.btnAddLocal}>
            <Text style={styles.btnAddLocalText}>+</Text>
          </TouchableOpacity>
        </View>
        <Modal animationType="slide" transparent={false} visible={this.state.modalVisible}>
            {this.state.localIndex != null && 
            <View style={styles.container2}>
              <StatusServer isConnected={this.state.isConnected} style={{top: 0}} />
              <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => this.closeLocal() }>
                  <Image
                    style={styles.backBtnImage}
                    source={require('../assets/images/back-icon.png')}
                  />
                </TouchableOpacity>
                <Text style={styles.welcome}>{locations[this.state.localIndex].name}</Text>
                <Text style={styles.welcome2}>{locations[this.state.localIndex].devices.length} dispositivos</Text>
              </View>
              <ScrollView style={{marginHorizontal: -10, paddingHorizontal: 10, paddingVertical: 20}}>
                {locations[this.state.localIndex].devices.map((device, i) => 
                  <TouchableOpacity key={i} style={styles.deviceBox}>
                    <View style={styles.deviceIconBox}>
                      <Image
                        style={styles.deviceIcon}
                        source={Icons[device.type]}
                      />
                    </View>
                    <Text style={styles.deviceName}>{device.name}</Text>
                    <View style={styles.toggleSwitchBox}>
                      <ToggleSwitch
                        isOn={device.status.on}
                        onColor="#496abc"
                        size="small"
                        onToggle={isOn => this.changeStatus(i, isOn)}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </ScrollView>
              <View style={{...styles.footer, backgroundColor: '#bbb'}}>
                <TouchableOpacity style={{...styles.btnAddLocal, borderColor: '#e9e9e9'}}>
                  <Text style={styles.btnAddLocalText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            }
        </Modal>
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
    backgroundColor: '#0e328e',
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
  },
  btnAddLocal: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#fff',
    textAlign: 'center',
    marginTop: -25,
    borderWidth: 6,
    borderColor: '#2b4ca0'
  },
  btnAddLocalText: {
    fontSize: 38, 
    color: '#0e328e', 
    textAlign: 'center',
    marginTop: -6
  },


  container2: {
    flex: 1,
    backgroundColor: '#e9e9e9',
  },
  header: {
    padding: 10,
    paddingTop: 50,
    paddingBottom: 30,
    borderBottomRightRadius: 120,
    backgroundColor: '#2b4ca0'
  },
  backBtn: {
    width: 25,
    height: 25,
    margin: 10,
  },
  backBtnImage: {
    width: 20,
    height: 20,
  },
  deviceBox: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    paddingVertical: 20,
    margin: 15,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  deviceIconBox: {
    flex: 1,
    maxWidth: 50,
  },
  deviceIcon: {
    width: 30,
    height: 30,
  },
  deviceName: {
    paddingTop: 7,
    flex: 2,
    flexDirection: 'column',
    alignContent: 'center'
  },
  toggleSwitchBox: {
    maxWidth: 40,
    flex: 1,
    paddingTop: 6,
    alignContent: 'flex-end'
  },
});

