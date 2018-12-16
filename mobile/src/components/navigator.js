import React, { Component } from 'react'
import {
    createSwitchNavigator,
    createStackNavigator,
    createBottomTabNavigator,
    createAppContainer
} from 'react-navigation'
import AuthScreen from './screens/auth'
import EventScreen from './screens/event'
import EventListScreen from './screens/event-list'
import PeopleListScreen from './screens/people-list'
import {observer, inject} from 'mobx-react'


const AuthStack = createStackNavigator({
  auth: {
    screen: AuthScreen,
    navigationOptions: {
        title: 'Auth'
    }
  }
})

const EventStack = createStackNavigator({
  event: {
    screen: EventScreen
  }
})

const EventListStack = createStackNavigator({
  eventList: {
    screen: EventListScreen,
    navigationOptions: {
      title: 'Events List'
    }
  }
})

const PeopleListStack = createStackNavigator({
  peopleList: {
    screen: PeopleListScreen,
    navigationOptions: {
      title: 'People List'
    }
  }
})

const ScreenTabs = createBottomTabNavigator({
  eventList: EventListStack,
  peopleList: PeopleListStack,
})

const SwitchNavigator = createSwitchNavigator({
  AuthStack,
  EventStack,
  ScreenTabs
})

const AppContainer = createAppContainer(SwitchNavigator);

@inject('navigation')
@observer
export default class AppNavigator extends Component {
  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          this.props.navigation.setNavRef(navigatorRef);
        }}
      />
    );
  }
}