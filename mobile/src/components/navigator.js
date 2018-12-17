import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import AuthScreen from './screens/auth'
import EventScreen from './screens/event'
import EventListScreen from './screens/event-list'
import PeopleListScreen from './screens/people-list'
import EventMapScreen from './screens/event-map'

const ListsNavigator = createBottomTabNavigator({
    events: {
        screen: EventListScreen
    },
    people: {
        screen: PeopleListScreen
    }
})


const StackNavigator = createStackNavigator({
    eventMap: {
        screen: EventMapScreen
    },
    auth: {
        screen: AuthScreen,
    },
    lists: {
        screen: ListsNavigator
    },
    event: {
        screen: EventScreen
    }
})

export default createAppContainer(StackNavigator)