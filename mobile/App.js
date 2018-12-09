import { createStackNavigator, createAppContainer } from 'react-navigation';
import { EventsListScreen } from './screens/EventsListScreen';
import { EventScreen } from './screens/EventScreen';


const AppNavigator = createStackNavigator(
  {
    EventsList: {screen: EventsListScreen},
    Event: {screen: EventScreen},
  },
  {
    initialRouteName: "EventsList"
  }
);

export default createAppContainer(AppNavigator);