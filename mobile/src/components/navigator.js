import { createStackNavigator, createAppContainer } from 'react-navigation'
import AuthScreen from './screens/auth'
import EventScreen from './screens/event'
import EventListScreen from './screens/event-list'

export default createAppContainer(createStackNavigator({
    auth: {
        screen: AuthScreen
    },
    event: {
        screen: EventScreen
    },
    eventList: {
        screen: EventListScreen,
        navigationOptions: {
            title: 'Events List'
        }
    }
}))