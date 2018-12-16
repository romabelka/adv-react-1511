import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import AuthScreen from './screens/auth'
import EventScreen from './screens/event'
import EventListScreen from './screens/event-list'
import PeopleScreen from './screens/people'

const TabNavigator = createAppContainer(createBottomTabNavigator({
    eventList: {
        screen: EventListScreen, 
        params: {
            title: 'Events List'
        } 
    },
    people: {
        screen: PeopleScreen, 
        params: {
            title: 'People'
        } 
    },
}))

TabNavigator.navigationOptions = ({ navigation }) => {
    const { params: { title } } = navigation.state.routes[navigation.state.index] 
    return {
        title
    }
  }

export default createAppContainer(createStackNavigator({
    auth: {
        screen: AuthScreen,
    },
    event: {
        screen: EventScreen
    },
    eventsAndPeople: {
        screen: TabNavigator
    }
}))
