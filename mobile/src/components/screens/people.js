import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import People from '../people/people'
import {observer, inject} from 'mobx-react'

@inject('people') @observer
class PeopleScreen extends Component {
    static propTypes = {

    };

    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.id
    })

    render() {
        const { id } = this.props.navigation.state.params
        return <People people = {this.props.people.people[id]} />
    }
}

const styles = StyleSheet.create({
})

export default PeopleScreen