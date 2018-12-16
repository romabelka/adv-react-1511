import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import AuthScreen from './screens/auth'
import EventScreen from './screens/event'
import EventListScreen from './screens/event-list'
import PeopleListScreen from './screens/people-list'

const infoNavigator = createBottomTabNavigator({
    eventList: {
        screen: EventListScreen,
        navigationOptions: {
            title: 'Events List'
        }
    },
    peopleList: {
        screen: PeopleListScreen,
        navigationOptions: {
            title: 'People List'
        }
    },
})

const single = createStackNavigator({
    auth: {
        screen: AuthScreen
    },
    event: {
        screen: EventScreen
    },
    info: infoNavigator
})

export default createAppContainer(single)