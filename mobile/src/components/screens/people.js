import React, { Component } from 'react'
import {View, Text, StyleSheet} from 'react-native'
//import People from '../events/people'
import withRouterProvider from '../decorators/with-router-provider'

class PeopleScreen extends Component {
    static propTypes = {

    };

    render() {
        return (
            <View><Text> People Screen </Text></View>
        )
    }
}

const styles = StyleSheet.create({
})

export default withRouterProvider(PeopleScreen)