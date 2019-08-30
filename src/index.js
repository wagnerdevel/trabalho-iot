import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from './pages/HomeScreen';

const Routes = createAppContainer(
  createStackNavigator({
    Home: HomeScreen
  }, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  })
);

export default Routes;