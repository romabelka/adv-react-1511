import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'
import Event from '../people/person'
import {inject, observer} from "mobx-react";

@inject('people')
class EventScreen extends Component {

    render() {
        const { id } = this.props.navigation.state.params
        const {people} = this.props.people
        return <Event person = {people[id]} />
    }
}

const styles = StyleSheet.create({
})

export default EventScreen