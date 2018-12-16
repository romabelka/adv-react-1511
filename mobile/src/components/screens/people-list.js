import React, { Component } from 'react'
import {StyleSheet} from 'react-native'
import PeopleList from '../people/people-list'
import stores from '../../stores'
import {observer, inject} from 'mobx-react'

@inject('people') @observer
class PeopleListScreen extends Component {
    static propTypes = {

    };
    render() {
        return <PeopleList onPersonPress = {this.handlePersonPress}/>
    }

    handlePersonPress = people => {
        stores.navigator.follow('people', { id: people.id })
    }
}


const styles = StyleSheet.create({
})

export default PeopleListScreen