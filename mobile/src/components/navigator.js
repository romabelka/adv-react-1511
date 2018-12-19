import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import AuthScreen from './screens/auth'
import EventScreen from './screens/event'
import EventListScreen from './screens/event-list'
import PeopleListScreen from './screens/people-list'
import EventMapScreen from './screens/event-map'
import Photo from './screens/photo'

const ListsNavigator = createBottomTabNavigator({
    events: {
        screen: EventListScreen
    },
    people: {
        screen: PeopleListScreen
    }
})


const StackNavigator = createStackNavigator({

    auth: {
        screen: AuthScreen,
    },
    photo: {
        screen: Photo
    },
    lists: {
        screen: ListsNavigator
    },
    event: {
        screen: EventScreen
    },


    /*  eventMap: {
         screen: EventMapScreen
     }, */
})

export default createAppContainer(StackNavigator)