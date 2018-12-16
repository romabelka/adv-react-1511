import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import AuthScreen from './screens/auth'
import EventScreen from './screens/event'
import EventListScreen from './screens/event-list'
import PeopleScreen from './screens/people'
import PeopleListScreen from './screens/people-list'


const eventsStackNavigator =  createStackNavigator({
    eventList: {
        screen: EventListScreen,
        navigationOptions: {
            title: 'Events List'
        }
    },
    event: {
        screen: EventScreen
    }
})

const peopleStackNavigator =  createStackNavigator({
    peopleList: {
        screen: PeopleListScreen,
        navigationOptions: {
            title: 'People List'
        }
    },
    people: {
        screen: PeopleScreen
    }
})

const tabNavigator = createBottomTabNavigator({
    auth: {
        screen: AuthScreen
    },
    events: eventsStackNavigator,
    people: peopleStackNavigator, 
},{})

const AppContainer = createAppContainer(tabNavigator);

export default AppContainer;