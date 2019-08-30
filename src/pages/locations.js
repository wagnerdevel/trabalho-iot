
const DeviceType = {
  lamp: 1,
  airConditioner: 2,
  television: 3,
  microwaveOven: 4,
  kettle: 5
}

export default [
  { 
    name: 'Quarto 1', 
    devices: [
      {id: 1, name: 'Lâmpada', type: DeviceType.lamp, status: {brightness: 20, on: true}},
      {id: 2, name: 'Televisão', type: DeviceType.television, status: {volume: 75, on: true}},
      {id: 3, name: 'Ar condicionado', type: DeviceType.airConditioner, status: {temperature: 22, on: false}},
    ] 
  }, { 
    name: 'Quarto 2', 
    devices: [
      {id: 4, name: 'Lâmpada', type: DeviceType.lamp, status: {brightness: 90, on: false}},
      {id: 5, name: 'Ar condicionado', type: DeviceType.airConditioner, status: {temperature: 22, on: false}},
    ] 
  }, { 
    name: 'Sala 1', 
    devices: [
      {id: 6, name: 'Lâmpada', type: DeviceType.lamp, status: {brightness: 90, on: true}},
      {id: 12, name: 'Lâmpada', type: DeviceType.lamp, status: {brightness: 90, on: true}},
      {id: 7, name: 'Televisão', type: DeviceType.television, status: {volume: 70, on: false}},
      {id: 8, name: 'Ar condicionado', type: DeviceType.airConditioner, status: {temperature: 24, on: false}},
    ] 
  }, { 
    name: 'Cozinha 1', 
    devices: [
      {id: 9, name: 'Microondas', type: DeviceType.microwaveOven, status: {on: false}},
      {id: 10, name: 'Lâmpada', type: DeviceType.lamp, status: {brightness: 90, on: false}},
      {id: 11, name: 'Cafeteria', type: DeviceType.kettle, status: {on: false}},
    ] 
  }
];